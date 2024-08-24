<template>
    <div class="bg-gray-50 px-4 shadow-md shadow-gray-50 w-11/12
    mb-5 rounded-2xl m-auto">
        <div class="my-5 w-full gap-3 flex flex-col md:flex-row items-center md:flex-wrap lg:flex-nowrap">
            <div class="md:flex lg:w-5/12">
                <div class="w-2/2 md:w-1/2 lg:w-full">
                    <AutocompleteList title="User" :suggestions="users" @getInfo="handleUserInfo"/>
                </div>
                <div class="w-2/2 md:w-1/2 lg:w-full">
                    <AutocompleteList title="Service" :suggestions="services" @getInfo="handleServiceInfo"/>
                </div>
            </div>
            <div class="md:flex lg:w-5/12">
                <div class="w-2/2 md:w-1/2 lg:w-full">
                    <AutocompleteList title="State" :suggestions="status" @getInfo="handleStatusInfo"/>
                </div>
                <div class="w-2/2 md:w-1/2 lg:w-full">
                    <Calendar title="Start date" @getDate="handleStartDate" :useDefaultValue="false" />
                </div>
            </div>
            <div class="md:w-1/4 m-auto lg:w-2/12">
                <button class="bg-slate-800 px-4 py-2 text-sm md:text-xl rounded-2xl text-slate-50 md:w-full"
                    @click="handleSearch">
                    Search
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineAsyncComponent, ref, onMounted, defineEmits, watch } from 'vue';
import { getUsers } from "@/service/user"
import { getServices } from "@/service/service"
import { getReservitionsByFilter } from "@/service/reservation"
import { status } from "@/modules/main/misc/utils"

const emit = defineEmits(["getReservations"])


const Calendar = defineAsyncComponent(() => import(/* webpackChunkName: 'Calendar' */'./Calendar.vue'))
const AutocompleteList = defineAsyncComponent(() => import(/* webpackChunkName: 'Calendar' */'../utils/AutocompleteList.vue'))

const filters = ref({})
const serviceInfo = ref(null)
const services = ref([])
const startDate = ref(null)
const statusInfo = ref(null)
const userInfo = ref(null)
const users = ref([])

const props = defineProps({
    hadReservationChanged: {
        required: true
    }
});

const handleServiceInfo = (data) => {
    serviceInfo.value = data
}

const handleStartDate = (data) => {
    startDate.value = data
}

const handleStatusInfo = (data) => {
    statusInfo.value = data
}

const handleUserInfo = (data) => {
    userInfo.value = data
}

const getServiceList = async () => {
    try {
        const { data } = await getServices()
        services.value = data
    } catch (error) {
        console.log(error)
    }
}

const getUsersList = async () => {
    try {
        const { data } = await getUsers()

        const updatedUsers = data.map(user =>
            Object.fromEntries(
                Object.entries(user).map(([key, value]) => {
                    switch (key) {
                        case 'username':
                            return ['name', value];
                        default:
                            return [key, value];
                    }
                })
            )
        );

        users.value = updatedUsers
    } catch (error) {
        console.log(error)
    }
}

const sendPetition = async (filtersToSearch) => {
    try {
        const { data } = await getReservitionsByFilter(filtersToSearch)
        emit('getReservations', data)
    } catch (error) {
        console.log(error)
    }
}

const handleSearch = () => {

    filters.value = {
        userId: userInfo.value?.id ?? null,
        serviceId: serviceInfo.value?.id ?? null,
        status: statusInfo.value?.name ?? null,
        startDate: startDate.value ?? null,
    }

    sendPetition(filters.value)
}

watch(
  () => props.hadReservationChanged,
  (newValue, oldValue) => {
    sendPetition(filters.value)
  }
)


onMounted(() => {
    getUsersList()
    getServiceList()
    sendPetition(filters.value)
})


</script>