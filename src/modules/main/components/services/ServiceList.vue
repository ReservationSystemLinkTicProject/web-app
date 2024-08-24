<script setup>
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ref, onMounted, defineEmits } from 'vue'
import { getServices } from "@/service/service"

const emit = defineEmits(['getServiceInfo'])
const props = defineProps({
    serviceId: {
        required: false
    }
});

const selectedService = ref(null)

const sendServiceInfo = (data) => {
    selectedService.value = data.id
    console.log(selectedService.value)
    emit("getServiceInfo", data)
}

const services = ref([])
const getServiceList = async () => {
    try {
        const { data } = await getServices()
        services.value = data
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getServiceList()
    selectedService.value = props.serviceId ?? null
})
</script>

<template>
    <div class="font-semibold text-sm md:text-xl text-center mt-5">
        <h2>Choose a service</h2>
    </div>
    <RadioGroup v-model="selectedService" v-show="services.length > 0">
        <div v-for="service in services" :key="service.id" @click="sendServiceInfo(service)">
            <Label :for="service.name" class="flex items-center w-full space-x-2">
                <div class="flex items-center w-full justify-between space-x-2">
                    <div class="w-10">
                        <RadioGroupItem :id="service.name" :value="service.id" />
                    </div>
                    <div class="flex justify-between w-full">
                        <div class="flex justify-between w-full items-center">
                            <div class="flex flex-col text-left">
                                <div>
                                    <Label class="font-bold leading-5">{{ service.name }}</Label>
                                </div>
                                <div>
                                    <Label>{{ service.description }}</Label>
                                </div>
                            </div>
                            <div class="rounded-lg">
                                <img :src="service.imageUrl" width="150px" height="125px" class="rounded-2xl">
                            </div>
                        </div>
                    </div>
                </div>
            </Label>
        </div>
    </RadioGroup>
</template>