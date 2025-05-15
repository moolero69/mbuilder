<?php

namespace Illuminate\Auth\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Str;

class EmailAsistencia extends Notification
{
    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $codigo = Str::upper(Str::random(5));

        return (new MailMessage)
            ->subject('Solicitud de asistencia')
            ->greeting('Hola, '.$notifiable->name)
            ->line('Hemos recibido tu solicitud de asistencia en mbuilder.')
            ->line('Un técnico se pondrá en contacto contigo lo antes posible.')
            ->line('Tu número de asistencia es: **' . $codigo . '**');
    }
}
