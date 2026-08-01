import { sourGummy } from '@/app/fonts'
import { cn } from '@/utils'

export default function Footer() {
    return (
        <footer className="mt-auto">
            <div className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2">
                                <figure>
                                    <h1
                                        className={cn(
                                            "leading-[100%] font-bold text-[28px]",
                                            sourGummy.className,
                                        )}
                                    >
                                        <span className="text-[#3964fe]">Mini</span>Url
                                    </h1>
                                </figure>
                            </div>
                            <p className="text-sm text-gray-600">
                                Create Stunning Short Links.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-900 transition-colors"
                                    >
                                        Analytics
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-900 transition-colors"
                                    >
                                        Plans
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-900 transition-colors"
                                    >
                                        Login
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">More</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-900 transition-colors"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-900 transition-colors"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="hover:text-gray-900 transition-colors"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {/* <Twitter className="w-6 h-6" /> */}
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {/* <Instagram className="w-6 h-6" /> */}
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    {/* <Linkedin className="w-6 h-6" /> */}
                                </a>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                Made with ❤️ Kiisi
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
