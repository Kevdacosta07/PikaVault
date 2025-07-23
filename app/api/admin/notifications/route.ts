
import { NextRequest, NextResponse } from 'next/server';

// Mock data - remplacez par votre base de données
const mockNotifications = [
    {
        id: '1',
        type: 'info',
        title: 'Nouvelle offre reçue',
        message: 'Une nouvelle offre de revente a été soumise par John Doe',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        action: {
            label: 'Voir l\'offre',
            href: '/admin/resell'
        }
    },
    // ... autres notifications
];

export async function GET(request: NextRequest) {
    try {
        // TODO: Récupérer les notifications depuis la base de données
        // const notifications = await getNotificationsFromDB();

        return NextResponse.json(mockNotifications);
    } catch (error) {
        console.error('Erreur lors de la récupération des notifications:', error);
        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // TODO: Créer une nouvelle notification en base de données
        const newNotification = {
            id: Date.now().toString(),
            ...body,
            timestamp: new Date(),
            read: false
        };

        return NextResponse.json(newNotification);
    } catch (error) {
        console.error('Erreur lors de la création de la notification:', error);
        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}