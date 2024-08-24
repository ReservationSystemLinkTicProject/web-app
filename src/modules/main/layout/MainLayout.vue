<template>
    <div class="bg-gray-800 py-3 px-3 lg:px-8 lg:py-6 w-full flex justify-between shadow-md items-center">
        <div>
            <img src="https://linktic.com/media/2024/03/logo-footer.svg" class="w-24 md:w-36" />
        </div>
        <div class="text-gray-300 font-black md:text-2xl text-center">
            <h2>
                Reservation System
            </h2>
        </div>

    </div>
    <div
        class="h-full text-xl p-6 md:p-4">
        <div class="flex justify-center flex-col md:mt-5 md:w-3/4 md:p-5 lg:p-16 m-auto bg-gray-800 shadow-md rounded-2xl">
            <router-view />
        </div>
        <p class="text-base md:text-lg my-6">
            <span class="text-black font-semibold">Powered by <span class="text-slate-800">Jonathan Tellez</span></span>
        </p>
    </div>
</template>