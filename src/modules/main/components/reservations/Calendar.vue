<template>
    <h2 class="font-semibold text-sm md:text-xl">{{ title }}</h2>
    <input type="date" v-model="date" class="rounded-lg border text-sm md:text-xl w-3/4 py-1 px-3 m-auto" @change="sentDate" :min="minDate ?? today"/>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
const emit = defineEmits(["getDate"])
const props = defineProps({
    title: {
        required: true
    },
    minDate: {
        required: false
    },
    useDefaultValue: {
        required: false,
        default: true
    },
    customValue: {
        required: false
    }
})


const today = new Date().toISOString().split('T')[0];
const date = ref(props.useDefaultValue ? today : props.customValue ? props.customValue : null);

const sentDate = (date) => {
    emit("getDate", date.target.value)
}
</script>