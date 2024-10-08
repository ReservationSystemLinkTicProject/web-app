<template>
    <Listbox as="div" v-model="selected" v-if="users.length > 0" class="w-2/4 m-auto">
        <ListboxLabel class="block text-sm md:text-xl font-medium leading-6 text-gray-900 mt-4">Choose a user</ListboxLabel>
        <div class="relative mt-2">
            <ListboxButton
                class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span class="flex items-center">
                    <span class="ml-3 block truncate">{{ selected.username }}</span>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-56 w-full overflow-auto overflow-y-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption as="template" v-for="person in users" :key="person.id" :value="person"
                        v-slot="{ active, selected }" @click="sendUserInfo(person)">
                        <li
                            :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                            <div class="flex items-center">
                                <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block ']">{{
                                    person.username }}</span>
                            </div>

                            <span v-if="selected"
                                :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { getUsers } from "@/service/user"

const emit = defineEmits(['getUserInfo'])
const props = defineProps({
    userId: {
        required: false
    }
});

const users = ref([])
const selected = ref({})
const getUsersList = async () => {
    try {
        const { data } = await getUsers()
        users.value = data
        selected.value = props.userId ? data.find(user => user.id == props.userId) : data[0]
        sendUserInfo(selected.value)
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    getUsersList()
})


const sendUserInfo = (person) => {
  emit("getUserInfo", person)
}


</script>