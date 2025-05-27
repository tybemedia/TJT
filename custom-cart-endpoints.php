<?php
/**
 * Custom WooCommerce Cart REST API Endpoints
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class WC_Custom_Cart_API {
    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    public function register_routes() {
        register_rest_route('wc/v3', '/cart', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_cart_contents'),
            'permission_callback' => '__return_true'
        ));

        register_rest_route('wc/v3', '/cart/add', array(
            'methods' => 'POST',
            'callback' => array($this, 'add_to_cart'),
            'permission_callback' => '__return_true'
        ));

        register_rest_route('wc/v3', '/cart/update', array(
            'methods' => 'POST',
            'callback' => array($this, 'update_cart_item'),
            'permission_callback' => '__return_true'
        ));

        register_rest_route('wc/v3', '/cart/remove', array(
            'methods' => 'POST',
            'callback' => array($this, 'remove_cart_item'),
            'permission_callback' => '__return_true'
        ));
    }

    private function init_woocommerce() {
        if (!function_exists('WC')) {
            return new WP_Error('woocommerce_not_active', 'WooCommerce is not active', array('status' => 400));
        }

        // Load WooCommerce
        if (!class_exists('WooCommerce')) {
            return new WP_Error('woocommerce_not_loaded', 'WooCommerce is not loaded', array('status' => 400));
        }

        // Initialize WooCommerce
        if (!did_action('woocommerce_init')) {
            // Load required files
            WC()->frontend_includes();
            
            // Initialize session
            if (!WC()->session) {
                WC()->session = new WC_Session_Handler();
                WC()->session->init();
            }

            // Initialize cart
            if (!WC()->cart) {
                WC()->cart = new WC_Cart();
            }

            // Initialize customer
            if (!WC()->customer) {
                WC()->customer = new WC_Customer(get_current_user_id(), true);
            }

            // Ensure cart is loaded
            if (!WC()->cart->is_empty()) {
                WC()->cart->get_cart_from_session();
            }

            // Set up cart session
            if (!WC()->session->has_session()) {
                WC()->session->set_customer_session_cookie(true);
            }
        }

        // Double check cart is available
        if (!WC()->cart) {
            return new WP_Error('cart_not_available', 'Cart is not available', array('status' => 400));
        }

        return true;
    }

    public function get_cart_contents() {
        $init = $this->init_woocommerce();
        if (is_wp_error($init)) {
            return $init;
        }

        $cart = WC()->cart;
        if (!$cart) {
            return new WP_Error('cart_not_available', 'Cart is not available', array('status' => 400));
        }

        $items = array();
        foreach ($cart->get_cart() as $cart_item_key => $cart_item) {
            $product = $cart_item['data'];
            if (!$product) {
                continue;
            }

            $items[] = array(
                'key' => $cart_item_key,
                'product_id' => $product->get_id(),
                'name' => $product->get_name(),
                'quantity' => $cart_item['quantity'],
                'price' => $product->get_price(),
                'total' => $cart_item['line_total'],
                'image' => wp_get_attachment_url($product->get_image_id())
            );
        }

        return array(
            'items' => $items,
            'total' => $cart->get_total(),
            'subtotal' => $cart->get_subtotal(),
            'shipping' => $cart->get_shipping_total(),
            'tax' => $cart->get_total_tax()
        );
    }

    public function add_to_cart($request) {
        $init = $this->init_woocommerce();
        if (is_wp_error($init)) {
            return $init;
        }

        $product_id = $request->get_param('product_id');
        $quantity = $request->get_param('quantity') ?: 1;

        if (!$product_id) {
            return new WP_Error('missing_product_id', 'Product ID is required', array('status' => 400));
        }

        $cart = WC()->cart;
        if (!$cart) {
            return new WP_Error('cart_not_available', 'Cart is not available', array('status' => 400));
        }

        $added = $cart->add_to_cart($product_id, $quantity);
        if (!$added) {
            return new WP_Error('add_to_cart_failed', 'Failed to add product to cart', array('status' => 400));
        }

        return $this->get_cart_contents();
    }

    public function update_cart_item($request) {
        $init = $this->init_woocommerce();
        if (is_wp_error($init)) {
            return $init;
        }

        $item_key = $request->get_param('cart_item_key');
        $quantity = $request->get_param('quantity');

        if (!$item_key || !$quantity) {
            return new WP_Error('missing_parameters', 'Cart item key and quantity are required', array('status' => 400));
        }

        $cart = WC()->cart;
        if (!$cart) {
            return new WP_Error('cart_not_available', 'Cart is not available', array('status' => 400));
        }

        $cart->set_quantity($item_key, $quantity);
        return $this->get_cart_contents();
    }

    public function remove_cart_item($request) {
        $init = $this->init_woocommerce();
        if (is_wp_error($init)) {
            return $init;
        }

        $item_key = $request->get_param('cart_item_key');
        if (!$item_key) {
            return new WP_Error('missing_item_key', 'Cart item key is required', array('status' => 400));
        }

        $cart = WC()->cart;
        if (!$cart) {
            return new WP_Error('cart_not_available', 'Cart is not available', array('status' => 400));
        }

        $cart->remove_cart_item($item_key);
        return $this->get_cart_contents();
    }
}

// Initialize the API
add_action('init', function() {
    WC_Custom_Cart_API::get_instance();
}); 