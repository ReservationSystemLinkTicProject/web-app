import apiGateway from "@/api/reservationApi"

export const getUsers = () => {
   return apiGateway("/users")
}