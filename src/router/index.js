import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Search from "@/views/Search";
import Men from "@/views/Men";
import Women from "@/views/Women";
import ItemDetails from "@/views/ItemDetails";
import WO23Collection from "@/views/WO23Collection";
import ME23Collection from "@/views/ME23Collection";
import About from "@/views/About";
import PrivacyPolicy from "@/views/PrivacyPolicy";
import TermsConditions from "@/views/TermsConditions";
import CookieStatement from "@/views/CookieStatement";
import Service from "@/views/Service";
import Checkout from "@/views/Checkout";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Favorites from "@/views/Favorites";
import PasswordReset from "@/views/PasswordReset";
import Settings from "@/views/Settings";
import Orders from "@/views/Orders";
import Returns from "@/views/Returns";
import Addresses from "@/views/Addresses";
import CartSummary from "@/views/CartSummary";
import CheckoutGuest from "@/views/CheckoutGuest";
import ProductCreate from "@/views/admin/ProductCreate";
import Products from "@/views/admin/Products";
import ProductDetails from "@/views/admin/ProductDetails";
import Contact from "@/views/Contact";
import ReturnItem from "@/views/ReturnItem";
import OrderConfirmation from "@/views/OrderConfirmation";
import ReturnConfirmation from "@/views/ReturnConfirmation";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
        path: "/search",
        name: "search",
        component: Search,
    },
    {
        path: "/men",
        name: "Men",
        component: Men,
    },
    {
        path: "/me23/collection",
        name: "ME23Collection",
        component: ME23Collection,
    },
    {
        path: "/wo23/collection",
        name: "WO23Collection",
        component: WO23Collection,
    }, {
        path: "/women",
        name: "Women",
        component: Women,
    }, {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
    {
        path: "/admin/product/create",
        name: "ProductCreate",
        component: ProductCreate,
    },
    {
        path: "/admin/products",
        name: "Products",
        component: Products,
    },
    {
        path: "/prod/:id",
        name: "ProductDetails",
        component: ProductDetails,
        props: true,
    }, {
        path: "/shop/:id",
        name: "ItemDetails",
        component: ItemDetails,
        props: true,
    },
    {
        path: "/cart/summary",
        name: "CartSummary",
        component: CartSummary,
    },
    {
        path: "/favorites",
        name: "Favorites",
        component: Favorites,
        props: true,
    },
    {
        path: "/privacy/policy",
        name: "PrivacyPolicy",
        component: PrivacyPolicy,
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
    },
    {
        path: "/order/confirmation",
        name: "OrderConfirmation",
        component: OrderConfirmation,
    },
    {
        path: "/return/confirmation",
        name: "ReturnConfirmation",
        component: ReturnConfirmation,
    },{
        path: "/orders",
        name: "Orders",
        component: Orders,
    }, {
        path: "/returns",
        name: "Returns",
        component: Returns,
    }, {
        path: "/return/item",
        name: "ReturnItem",
        component: ReturnItem,
        props: true,
    }, {
        path: "/addresses",
        name: "Addresses",
        component: Addresses,
    }, {
        path: "/terms",
        name: "TermsConditions",
        component: TermsConditions,
    },
    {
        path: "/cookie",
        name: "CookieStatement",
        component: CookieStatement,
    },
    {
        path: "/service",
        name: "Service",
        component: Service,
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout,
        props: true,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    }, {
        path: "/checkout/guest",
        name: "CheckoutGuest",
        component: CheckoutGuest,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    }, {
        path: "/password",
        name: "PasswordReset",
        component: PasswordReset,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
