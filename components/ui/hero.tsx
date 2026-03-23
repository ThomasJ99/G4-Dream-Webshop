import Image from "next/image";

export default function Hero () {
    return (

        <header className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
            <img
            src={"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"}
            alt="Dream Webshop hero image"
            fill="true"
            className="object-cover"
            // Make it load fast when changed to Image
            />
            <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-transparent">

            </div>
        </div>
    </header>
        )
}