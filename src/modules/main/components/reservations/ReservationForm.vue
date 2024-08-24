<template>
    <Accordion type="single" collapsible class="bg-gray-50 px-4 shadow-md shadow-gray-50 w-11/12
     rounded-2xl m-auto" v-if="isEdit" v-for="reservation in reservations">
        <AccordionItem value="item-1">
            <AccordionTrigger class="no-underline text-sm md:text-xl justify-between">
                <div class="flex no-underline">
                    <p>
                        <span class="font-semibold text-sm md:text-xl">Start date</span> {{ reservation.startDate }} -
                        <span class="font-semibold text-sm md:text-xl">End date </span> {{ reservation.endDate }}
                    </p>
                </div>
                <div>
                    <span :class="getButtonClass(reservation.status)">{{ reservation.status }}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div class="w-2/4 m-auto mb-3">
                    <UserList @getUserInfo="handleUserInfo" :userId="reservation.userId" />
                </div>
                <div class="w-1/4 m-auto">
                    <AutocompleteList title="State" :suggestions="status" @getInfo="handleStatusInfo"/>
                </div>
                <ServiceList @getServiceInfo="handleServiceInfo" :serviceId="reservation.serviceId" />
                <div class="flex">
                    <div class="w-1/2">
                        <Calendar title="start date" @getDate="handleStartDate" :customValue="reservation.startDate"
                            :use-default-value="false" />
                    </div>
                    <div class="w-1/2">
                        <Calendar title="end date" @getDate="handleEndDate" :minDate="startDate"
                            :customValue="reservation.endDate" :use-default-value="false" />
                    </div>
                </div>
                <div class="mt-5">
                    <button class="bg-slate-800 px-4 py-2 rounded-2xl text-slate-50"
                        @click="sendPetitionUpdate(reservation.id, reservation)">
                        Update
                    </button>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
    <Accordion type="single" collapsible class="bg-gray-50 px-4 shadow-md shadow-gray-50 w-11/12
    mb-5 rounded-2xl m-auto" v-else>
        <AccordionItem value="item-1">
            <AccordionTrigger class="text-sm md:text-xl no-underline">Create reservation</AccordionTrigger>
            <AccordionContent>
                <UserList @getUserInfo="handleUserInfo" />
                <ServiceList @getServiceInfo="handleServiceInfo" />
                <div class="flex">
                    <div class="w-1/2">
                        <Calendar title="start date" @getDate="handleStartDate" />
                    </div>
                    <div class="w-1/2">
                        <Calendar title="end date" @getDate="handleEndDate" :minDate="startDate" />
                    </div>
                </div>
                <div class="mt-5">
                    <button class="bg-slate-800 px-4 py-2 rounded-2xl text-slate-50" @click="handleCreate">
                        Create
                    </button>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
</template>
<script setup>
import { defineAsyncComponent, ref, defineEmits } from 'vue';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { toast } from 'vue3-toastify'

import { createReservation, updateReservation } from "@/service/reservation"
import { status } from "@/modules/main/misc/utils"


const ServiceList = defineAsyncComponent(() => import(/* webpackChunkName: 'Service list' */'@/modules/main/components/services/ServiceList.vue'))
const Calendar = defineAsyncComponent(() => import(/* webpackChunkName: 'Calendar' */'./Calendar.vue'))
const UserList = defineAsyncComponent(() => import(/* webpackChunkName: 'Calendar' */'@/modules/main/components/user/UserList.vue'))
const AutocompleteList = defineAsyncComponent(() => import(/* webpackChunkName: 'Calendar' */'../utils/AutocompleteList.vue'))

const userInfo = ref(null)
const serviceInfo = ref(null)
const startDate = ref(new Date().toISOString().split('T')[0])
const endDate = ref(new Date().toISOString().split('T')[0])
const reservation = ref({})
const statusInfo = ref(null)

const emit = defineEmits(["getReservationsChanges"])
const props = defineProps({
    isEdit: {
        type: Boolean,
        required: false,
        default: false
    },
    reservations: {
        type: Array,
        required: false,
        default: () => []
    }
});

const getButtonClass = (status) => {
    switch (status) {
        case 'active':
            return 'bg-green-800 text-white px-4 py-2 text-sm md:text-lg rounded-2xl md:w-full';
        case 'complete':
            return 'bg-gray-500 text-white px-4 py-2 text-sm md:text-lg rounded-2xl md:w-full';
        case 'cancelled':
            return 'bg-red-700 text-white px-4 py-2 text-sm md:text-lg rounded-2xl md:w-full';
        default:
            return 'bg-gray-500 text-white px-4 py-2 text-sm md:text-lg rounded-2xl md:w-full';
    }
};

const showNotification = (message, type) => {
    toast(message, {
        type, // 'success', 'error', 'info', 'warning', etc.
        autoClose: 3000,
    })
}

const handleUserInfo = (data) => {
    userInfo.value = data
}

const handleServiceInfo = (data) => {
    serviceInfo.value = data
}

const handleStartDate = (data) => {
    startDate.value = data
}

const handleEndDate = (data) => {
    endDate.value = data
}

const handleStatusInfo = (data) => {
    statusInfo.value = data
}

const sendPetitionCreate = async () => {
    try {
        await createReservation(reservation.value)
        showNotification("Reservacion create succesfull", "succcess")
        emit("getReservationsChanges", true)
    } catch (error) {
        console.log(error)
    }
}

const sendPetitionUpdate = async (id, reservation) => {
    reservation.value = {
        userId: userInfo.value?.id ?? reservation.userId,
        serviceId: serviceInfo.value?.id ?? reservation.serviceId,
        status: statusInfo.value?.name ?? reservation.status,
        startDate: startDate.value ?? reservation.startDate,
        endDate: endDate.value ?? reservation.endDate
    }
    try {
        await updateReservation(id, reservation.value)
        showNotification("Reservacion update succesfull", "succcess")
        emit("getReservationsChanges", true)
    } catch (error) {
        console.log(error)
    }
}


const handleCreate = () => {
    if (!userInfo.value) {
        showNotification("Please choose a user", "danger")
        return
    }

    if (!serviceInfo.value) {
        showNotification("Please choose a service", "danger")
        return
    }

    if (!startDate.value) {
        showNotification("Please choose a start date", "danger")
        return
    }

    if (!endDate.value) {
        showNotification("Please choose a end date", "danger")
        return
    }

    if (startDate.value > endDate.value) {
        showNotification("The end date must be greater that start date", "danger")
        return
    }

    reservation.value = {
        userId: userInfo.value.id,
        serviceId: serviceInfo.value.id,
        status: "active",
        startDate: startDate.value,
        endDate: endDate.value
    }

    sendPetitionCreate()
}
</script>