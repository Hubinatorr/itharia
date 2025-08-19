<template>
    <nav class="bg-white border-stone-200 bg-stone-950 shadow-sm">
        <div class="flex flex-wrap justify-between mx-auto p-2">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/favicon.png" class="w-14 h-auto"
                     alt="Flowbite Logo"/>
                <span class="self-center text-3xl text-yellow-100 font-semibold whitespace-nowrap">Itharia</span>
            </a>

            <button @click="isMobileMenuOpen = !isMobileMenuOpen" type="button"
                    class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-stone-500 rounded-lg md:hidden hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-200 dark:text-stone-400 dark:hover:bg-stone-700 dark:focus:ring-stone-600"
                    aria-controls="navbar-dropdown" :aria-expanded="isMobileMenuOpen">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>

            <div :class="{'hidden': !isMobileMenuOpen, 'block': isMobileMenuOpen}"
                 class="w-full md:block md:w-auto place-self-center px-2"
                 id="navbar-dropdown">
                <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-stone-100 rounded-lg bg-stone-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-stone-800 md:dark:bg-stone-950 dark:border-stone-700">

                    <li>
                        <a href="/"
                           class="text-xl block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-yellow-200"
                           aria-current="page">
                            Home
                        </a>
                    </li>

                    <li
                            class="relative"
                            @mouseover="isBooksDropdownOpen = true"
                            @mouseleave="isBooksDropdownOpen = false"
                    >
                        <button class="flex text-xl items-center justify-between w-full py-2 px-3 text-stone-900 rounded hover:bg-stone-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-yellow-200 dark:focus:text-white dark:border-stone-700 dark:hover:bg-stone-700 md:dark:hover:bg-transparent">
                            Books
                            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <div v-show="isBooksDropdownOpen"
                             class="absolute z-10 font-normal bg-white divide-y divide-stone-100 rounded-lg shadow w-52 dark:bg-stone-900 dark:divide-stone-600">
                            <ul class="py-2 text-sm text-stone-700 dark:text-stone-400">
                                <li><a href="/sample-chapters"
                                       class="block px-4 py-2 dark:hover:text-yellow-200 text-xl">Sample
                                    Chapters</a></li>
                            </ul>
                        </div>
                    </li>

                    <li
                            class="relative"
                            @mouseover="isGamesDropdownOpen = true"
                            @mouseleave="isGamesDropdownOpen = false"
                    >
                        <button class="flex text-xl items-center justify-between w-full py-2 px-3 text-stone-900 rounded hover:bg-stone-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-yellow-200 dark:focus:text-white dark:border-stone-700 dark:hover:bg-stone-700 md:dark:hover:bg-transparent">
                            Games
                            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        <div v-show="isGamesDropdownOpen"
                             class="absolute z-10 font-normal bg-white divide-y divide-stone-100 rounded-lg shadow w-44 dark:bg-stone-900 dark:divide-stone-600">
                            <ul class="py-2 text-sm text-stone-700 dark:text-stone-400">
                                <li><a href="/war-of-itharia"
                                       class="block px-4 py-2 dark:hover:text-yellow-200 text-xl">War
                                    of Itharia</a></li>
                                <li><a href="/quests-of-itharia"
                                       class="block px-4 py-2 dark:hover:text-yellow-200 text-xl">Quest
                                    of Itharia</a></li>
                                <li><a href="/cards-of-itharia"
                                       class="block px-4 py-2 dark:hover:text-yellow-200 text-xl">Cards
                                    of Itharia</a></li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <a href="/almanach"
                           class="block text-xl py-2 px-3 text-stone-900 rounded hover:bg-stone-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-yellow-200 dark:hover:bg-stone-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            Almanach
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import {ref} from 'vue';

// Reactive state for each dropdown menu
const isBooksDropdownOpen = ref(false);
const isGamesDropdownOpen = ref(false);

// Reactive state for the mobile hamburger menu
const isMobileMenuOpen = ref(false);
</script>

<style scoped>
/* You can add component-specific styles here if needed */
</style>
