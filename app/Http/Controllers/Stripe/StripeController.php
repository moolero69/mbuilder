<?php

namespace App\Http\Controllers\Stripe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;

class StripeController extends Controller
{
    public function index()
    {
        return Inertia::render('stripe/suscribirse');
    }

    public function checkout()
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

        $successURL = route('stripe.success') . '?session_id={CHECKOUT_SESSION_ID}';
        $errorURL = route('stripe.error');

        $respuesta = $stripe->checkout->sessions->create([
            'success_url' => $successURL,
            'cancel_url' => $errorURL,
            'customer_email' => auth()->user()->email,
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'EUR',
                        'product_data' => [
                            'name' => 'Usuario PRO mbuilder',
                            'images' => ['https://cdn-icons-png.flaticon.com/128/16866/16866803.png'],
                        ],
                        'unit_amount' => 20 * 100,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
        ]);

        return redirect($respuesta['url']);
    }


    public function success(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

        $respuesta = $stripe->checkout->sessions->retrieve($request->session_id, []);

        $usuario = auth()->user();
        $usuario->es_pro = 'Si';
        $usuario->save();

        return Inertia::render('stripe/pagoExitoso');
    }


    public function error()
    {
        return Inertia::render('stripe/pagoError');
    }
}
