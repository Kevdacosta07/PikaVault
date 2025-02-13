import ContactForm from "@/components/Contact/ContactForm";

export default function ContactPage() {
    return (
        <div className="relative w-full h-[100vh] flex flex-col overflow-y-hidden gap-4 justify-center items-center">
            {/* 🎥 Vidéo de fond */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/assets/videos/contactBackground.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
            </video>

            {/* Overlay pour améliorer la lisibilité */}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

            {/* 📜 Contenu principal (formulaire + titre) */}
            <div className="relative z-10 flex flex-col items-center text-center">
                <h1 className="text-5xl font-bold mb-2 text-white">
                    Contactez <span className="px-3 rounded-xl shadow-md shadow-gray-600 py-1 bg-orange-500 text-white">notre équipe</span>
                </h1>
                <p className="text-xl mt-3 text-gray-200 font-medium">
                    Une réponse vous sera donnée sous <span className="underline italic">24h</span> !
                </p>

                {/* Formulaire de contact */}
                <ContactForm />
            </div>
        </div>
    );
}
