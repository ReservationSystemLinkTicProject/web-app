<template>
    <div class="flex gap-4 flex-col">
        <div>
            <h2 class="my-5 font-black text-lg text-gray-300 md:text-4xl text-center">Welcome to reservation system</h2>
        </div>
        <Search @getReservations="handleReservations" :hadReservationChanged="reservationChanges"/>
        <ReservationForm @get-reservations-changes="handleReservationsChange"/>
        <ReservationForm :isEdit="true" :reservations="reservations" @get-reservations-changes=""/>
    </div>
</template>
<script setup>
import { defineAsyncComponent, ref } from 'vue';

const ReservationForm = defineAsyncComponent(() => import(/* webpackChunkName: 'Reservation form' */'../components/reservations/ReservationForm.vue'))
const Search = defineAsyncComponent(() => import(/* webpackChunkName: 'Search' */'../components/reservations/Search.vue'))

const reservations = ref()
const reservationChanges = ref(false)
const handleReservations = (data) => {
    reservations.value = data
    reservationChanges.value = false
}

const handleReservationsChange = (data) => {
    reservationChanges.value = data
}
</script>