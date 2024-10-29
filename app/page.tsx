"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Vortex } from "@/components/ui/vortex";
import Main from "@/components/base/Main";
import { Navbar } from "@/components/base/Navbar";
import SearchUrl from "@/components/base/SearchUrl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CardFeature from "@/components/base/FeatureCard";
import { Compare } from "@/components/ui/compare";
import { Spotlight } from "@/components/ui/spotlight";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
    return (
        <Main className="flex flex-col relative pb-[20rem]">
            <Navbar />

            <header id="hero" className="h-dvh w-dvw rounded-md isolate flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
                <div className="w-full rounded-md h-full overflow-hidden">
                    <Vortex rangeY={800} particleCount={400} baseHue={120} className="grid w-full h-full">
                        <div className="grid place-items-center backdrop-blur-[2px] bg-[rgb(0_0_0/.1)]">
                            <div className="flex flex-col justify-center items-center conn">
                                <h1 hidden>Remember Your Link</h1>
                                <TextGenerateEffect duration={1.5} words="Remember Your Link" className="poppins text-white text-2xl md:text-7xl font-bold text-center" />
                                <TextGenerateEffect
                                    duration={2}
                                    words="GERAWANA turns lengthy, cluttered links into streamlined, memorable URLs, making it easy to share, organize, and keep track of important content. Elevate your links with a tool designed for simplicity and convenience—because every URL deserves to be unforgettable."
                                    className="poppins text-sm md:text-xl opacity-75 text-white text-center"
                                />
                            </div>
                        </div>
                    </Vortex>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[30rem] z-10 bg-gradient-to-b from-transparent to-background"></div>
            </header>

            <section id="features" className="bg-grid-white/[.05] relative isolate">
                <SearchUrl />
                <div className="conn pt-[20rem] flex justify-center items-start gap-[4rem]">
                    <div className="absolute z-[-1] pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,hsl(var(--background))_55%)]"></div>
                    <div className="w-1/2 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl font-bold">Simple and fast URL shortener!</h3>
                            <p>
                                ShortURL allows to shorten long links from Instagram, Facebook, YouTube, Twitter, Linked In, WhatsApp, TikTok, blogs and sites. Just paste the long URL and click the
                                Shorten URL button. On the next page, copy the shortened URL and share it on sites, chat and emails. After shortening the URL, check how many clicks it received.
                            </p>
                            <Link href="/dashboard">
                                <Button className="px-6" variant="default">
                                    Try it
                                </Button>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <CardFeature title="Easy" description="ShortURL is easy and fast, enter the long link to get your shortened link" />
                            <CardFeature title="Shortened" description="Use any link, no matter what size, ShortURL always shortens" />
                            <CardFeature title="Secure" description="It is fast and secure, our service has HTTPS protocol and data encryption" />
                            <CardFeature title="Statistics" description="Check the number of clicks that your shortened URL received" />
                        </div>
                    </div>
                    <div className="w-1/2 [perspective:800px]">
                        <div className="mt-20" style={{ transform: "rotateX(15deg) rotateZ(5deg) rotateY(-5deg) translateZ(80px)" }}>
                            <Compare
                                className="mb-auto w-full h-[10rem]"
                                secondImageClassname="w-full h-auto"
                                firstImageClassName="w-full h-auto"
                                firstImage="/images/compare1.png"
                                secondImage="/images/compare2.png"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="min-h-[30rem] mt-20 isolate w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-visible">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-10" fill="white" />
                <div className="absolute z-[-1] pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,hsl(var(--background))_55%)]"></div>
                <div className="conn w-full flex flex-col items-center justify-center gap-4">
                    <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
                        <h3 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                            Frequently Asked <br /> Questions
                        </h3>
                        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
                            Have questions about GERAWANA? Discover all you need to know about link shortening, customization, and sharing—all in one place.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="max-w-[40rem] w-full bg-zinc-900 p-4 rounded-md">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is this free?</AccordionTrigger>
                            <AccordionContent>Yes. this is free. (as long as i have money)</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Who is the owner?</AccordionTrigger>
                            <AccordionContent>
                                I'm ISLA. You can find me on{" "}
                                <Link className="text-primary font-bold underline" href="https://github.com/mangadi3859">
                                    github
                                </Link>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Will i get annoying email if i created an account?</AccordionTrigger>
                            <AccordionContent>No. We don't have plan to monetize this website.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Can i create multiples short link with the same url?</AccordionTrigger>
                            <AccordionContent>No. We don't allow duplicate url to minimize database usage.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </Main>
    );
}
