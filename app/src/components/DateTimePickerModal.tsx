/* eslint-disable react-hooks/exhaustive-deps */
import { useModalStore } from '@stores/useModalStore';
import { Calendar, Modal, TimePicker } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import DescriptionItem from './DescriptionItem';
import moment, { Moment } from 'moment';
import * as dayjs from 'dayjs';

type Props = {};

const DateTimePickerModal = (props: Props) => {
  const { openedModals, closeModal } = useModalStore();
  const { status, extraParams } = useMemo(
    () => openedModals['dateTimePickerModal'],
    [openedModals]
  );
  const dateTime = useMemo<Moment>(
    () => moment.unix(extraParams?.dateTime) || moment(),
    [extraParams, openedModals['dateTimePickerModal']]
  );
  const onClose = useMemo<(newValue: number) => void>(
    () => extraParams?.onClose,
    [extraParams, openedModals['dateTimePickerModal']]
  );
  const [date, setDate] = useState<number>(dateTime.unix());
  const [time, setTime] = useState<{
    hour: number;
    minute: number;
  }>({
    hour: dateTime.hour(),
    minute: dateTime.minute(),
  });

  const handleUpdateTime = (updatedTime: dayjs.Dayjs | null, _: string) => {
    if (!updatedTime) return;
    setTime({
      hour: updatedTime.hour(),
      minute: updatedTime.minute(),
    });
  };

  const onCalendarSelected = (day: dayjs.Dayjs) => {
    setDate(day.unix());
  };

  const handleSaveDate = (newValue: number) => {
    onClose(newValue);
    closeModal('dateTimePickerModal');
  };

  useEffect(() => {
    setDate(dateTime.unix());
    setTime({
      hour: dateTime.hour(),
      minute: dateTime.minute(),
    });
  }, [dateTime]);

  return (
    <Modal
      onCancel={() => closeModal('dateTimePickerModal')}
      onOk={() => handleSaveDate(moment.unix(date).hour(time.hour).minute(time.minute).unix())}
      open={status}>
      <DescriptionItem
        title="Time"
        content={
          <TimePicker
            use12Hours
            format="h:mm a"
            value={dayjs.unix(
              moment({
                hour: time.hour,
                minute: time.minute,
              }).unix()
            )}
            onChange={handleUpdateTime}
          />
        }
      />
      <Calendar value={dayjs.unix(date)} fullscreen={false} onSelect={onCalendarSelected} />
    </Modal>
  );
};

export default DateTimePickerModal;
