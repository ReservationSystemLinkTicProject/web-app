import apiGateway from "@/api/reservationApi"

export const getServices = () => {
   return apiGateway("/services")
}