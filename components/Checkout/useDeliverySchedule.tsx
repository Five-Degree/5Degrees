import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

export default function useDeliverySchedule() {
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [rapidDelivery, setRapidDelivery] = useState(false);
  const [scheduledDeliveryDate, setScheduledDeliveryDate] =
    useState<Dayjs | null>(dayjs().add(3, "days"));

  const handleScheduleDelivery = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    // setRapidDelivery(false);
    setScheduleDelivery(checked);
  };

  const handleRapidDelivery = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => setRapidDelivery(checked);

  const handleScheduledDeliveryDate = (day: Dayjs) =>
    setScheduledDeliveryDate(day);

  return {
    scheduleDelivery,
    rapidDelivery,
    scheduledDeliveryDate,
    handleScheduleDelivery,
    handleRapidDelivery,
    handleScheduledDeliveryDate,
  };
}
