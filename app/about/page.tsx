"use client";

import React from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <div className="m-auto max-w-[1440px]">
        <Header />
        <main className="mx-auto max-w-6xl px-8 py-12 text-gray-800">
          <h1 className="mb-6 text-center text-4xl font-bold">
            About Stay Way
          </h1>

          <section className="mb-16 flex flex-col-reverse items-center gap-10 text-lg leading-7 md:flex-row md:gap-16">
            <div className="md:w-1/2">
              <h2 className="mb-4 text-3xl font-bold">Welcome to Stay Way</h2>
              <p>
                <strong>Stay Way</strong> is your trusted travel companion —
                helping millions of travelers around the globe find their
                perfect stay. Whether it’s a luxury hotel, a cozy cabin, or a
                family-friendly motel — we’ve got it all.
              </p>
              <p className="mt-4">
                With our smart search and seamless booking experience, planning
                your trip has never been easier. We believe travel should be
                enjoyable from start to finish — and that starts with finding
                the right place to stay.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/image/hotels.jpg"
                alt="Stay Way hero"
                className="w-full rounded-xl shadow-md"
                width={600}
                height={400}
              />
            </div>
          </section>

          <section className="bg-white px-6 py-16 md:px-20">
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="mb-8 text-3xl font-semibold">Our Core Values</h2>
              <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-4">
                {[
                  "User-Centered Design",
                  "Transparency",
                  "Security & Trust",
                  "Global Accessibility",
                ].map((val, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <h3 className="mb-2 text-xl font-semibold">{val}</h3>
                    <p className="text-sm text-gray-600">
                      {val === "User-Centered Design"
                        ? "Everything we build starts with the user."
                        : val === "Transparency"
                          ? "Clear pricing and honest service."
                          : val === "Security & Trust"
                            ? "Your safety is our priority."
                            : "We serve customers in every corner of the world."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold">Contact Us</h2>
            <p className="mb-6">
              Have questions? We&apos;d love to hear from you.
            </p>

            <div className="mx-auto max-w-xl">
              <form className="space-y-6 text-left">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Type your message here..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="rounded-full bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
                  >
                    Send Message
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500">
                Or reach us directly at{" "}
                <a
                  href="mailto:support@stayway.com"
                  className="text-blue-500 underline"
                >
                  support@stayway.com
                </a>{" "}
                or call <span className="font-medium">+1 (800) 123-4567</span>
              </p>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
