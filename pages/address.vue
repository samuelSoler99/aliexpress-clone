<template>
  <MainLayout>
    <div id="AddressPage" class="mt-4 max-w-[500px] mx-auto px-2">
      <div class="mx-auto bg-white rounded-lg p-3">
        <div class="text-xl text-bold mb-2">Addres Details</div>

        <form @submit.prevent="submit()">
          <TextInput class="w-full"
                     placeholder="Contact Name"
                     inputType="text"
                     v-model:input="contactName"
                     :error="error && error.type == 'contactName' ? error.message : ''"
          />

          <TextInput class="w-full mt-2"
                     placeholder="Address"
                     inputType="text"
                     v-model:input="address"
                     :error="error && error.type == 'address' ? error.message : ''"
          />

          <TextInput class="w-full mt-2"
                     placeholder="Zip Code"
                     inputType="text"
                     v-model:input="zipcode"
                     :error="error && error.type == 'zipcode' ? error.message : ''"
          />

          <TextInput class="w-full mt-2"
                     placeholder="City"
                     inputType="text"
                     v-model:input="city"
                     :error="error && error.type == 'city' ? error.message : ''"
          />

          <TextInput class="w-full mt-2"
                     placeholder="Country"
                     inputType="text"
                     v-model:input="country"
                     :error="error && error.type == 'country' ? error.message : ''"
          />
          <button
              :disabled="isWorking"
              type="submit"
              class="mt-6 bg-gradient-to-r from-[#FE630C] to-[#FF3200] w-full text-white text-[21px] font-semibold p-1.5 rounded-full"
          >
            <div v-if="!isWorking">
              Update Address
            </div>
            <Icon v-else name="eos-icons:loading" size="25" class="mr-2"></Icon>
          </button>
        </form>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import {useUserStore} from "~/stores/user.js";

const userStore = useUserStore()
const user = useSupabaseUser()

let contactName = ref(null)
let address = ref(null)
let zipcode = ref(null)
let city = ref(null)
let country = ref(null)

let currentAddress = ref(null)
let isUpdate = ref(false)
let isWorking = ref(false)
let error = ref(null)

watchEffect(async () => {
  currentAddress.value = await useFetch(`/api/prisma/get-address-by-user/${user.value.id}`)

  if (currentAddress.value.data) {
    contactName.value = currentAddress.value.data.name
    address.value = currentAddress.value.data.address
    zipcode.value = currentAddress.value.data.zipcode
    city.value = currentAddress.value.data.city
    country.value = currentAddress.value.data.country

    isUpdate.value = true
  }
  userStore.isLoading = false
})

const submit = async () => {
  isWorking.value = true
  error.value = null

  if (!contactName.value) {
    error.value = {
      type: 'contactName',
      message: 'A contact name is required'
    }
  } else if (!address.value) {
    error.value = {
      type: 'address',
      message: 'An address is required'
    }
  } else if (!zipcode.value) {
    error.value = {
      type: 'zipcode',
      message: 'A zip code is required'
    }
  } else if (!city.value) {
    error.value = {
      type: 'city',
      message: 'A city is required'
    }
  } else if (!country.value) {
    error.value = {
      type: 'country',
      message: 'A country is required'
    }
  }

  if (error.value) {
    isWorking.value = false
    return
  }

  if (isUpdate.value) {
    await useFetch(`/api/prisma/update-address/${currentAddress.value.data.id}`, {
      method: 'PATCH',
      body: {
        userId: user.value.id,
        name: contactName.value,
        address: address.value,
        zipcode: zipcode.value,
        city: city.value,
        country: country.value
      }
    })

    isWorking.value = false

    return navigateTo('/checkout')
  }

  await useFetch('/api/prisma/add-address',{
    method: 'POST',
    body: {
      userId: user.value.id,
      name: contactName.value,
      address: address.value,
      zipcode: zipcode.value,
      city: city.value,
      country: country.value
    }
  })

  isWorking.value = false

  return navigateTo('/checkout')
}
</script>