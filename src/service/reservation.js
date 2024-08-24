import apiGateway from "@/api/reservationApi"

export const createReservation = (reservation) => {
    return apiGateway.post("/reservations", reservation)
}

export const updateReservation = (id, reservation) => {
    return apiGateway.patch(`/reservations/${id}`, reservation)
}

export const getReservitionsByFilter = (filters) => {

    const queryParams = new URLSearchParams();

    if (filters.userId) queryParams.append('userId', filters.userId);
    if (filters.serviceId) queryParams.append('serviceId', filters.serviceId);
    if (filters.startDate) queryParams.append('startDate', filters.startDate);
    if (filters.status) queryParams.append('status', filters.status);

    return apiGateway(`/reservations/filters?${queryParams.toString()}`)
}