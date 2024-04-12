import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import descriptionStyles from './styles2.module.scss'; // TODO: поменять название
import { TEvent } from '../../shared/types';
import Button from '../../shared/ui/button';
import EventInfoText from '../eventInfoText';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Drawer } from '@mui/material';
import { shortEventTypeToWordsMap } from '../../shared/constants';
import EventDetailsPage from '../../pages/eventDetailsPage';
import EventQr from '../eventQr';
import { splitDatetimeString } from '../../shared/utils';
import { useQuery } from '@tanstack/react-query';
import { uploadImage } from '../../entities/event/api';

type Props = {
  data: TEvent
  showUpperBubble: boolean
  customUpperBubbleText?: string
  customActionButtonText?: string
  customActionButtonAction?: (
    e?: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void
  showActionButton?: boolean
  cardType: 'base' | 'description' | 'userPage'
}
const EventCard = ({
  data,
  showUpperBubble,
  customUpperBubbleText,
  showActionButton,
  customActionButtonAction,
  customActionButtonText,
  cardType = 'base',
}: Props) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
  const navigate = useNavigate();
  const buyTickets = () => {};
  const toggleQrModal = () => setIsQrModalOpen(prev => !prev);
  const toggleEventDetailsModal = (value: boolean) => setIsEventDetailsModalOpen(value);

  let { datetime, short_name, place, price, event_id, event_type, age_restriction, bar_id, img_path } = data;
  const {data: imgData, isLoading: isImgDataLoading} = useQuery({
    queryKey: ['imgData', img_path],
    queryFn: () => uploadImage(img_path),
  })

  place = place.split('/')[0];
  const time = `с ${splitDatetimeString(datetime)[1]}`;

  return (
    <>
      <div
        className={classNames(
          cardType === 'description' ? descriptionStyles.root: styles.root,
        )}
        onClick={(e) => {
          if (cardType === 'base') {
            toggleEventDetailsModal(true);
          }
          else if (cardType === 'userPage') {
            // @ts-ignore жесть костыль
            if (e.target.textContent !== 'Изменить бронь') toggleQrModal();
            else toggleEventDetailsModal(true);
          }
        }}
        style={isImgDataLoading ?
          {backgroundImage: `url()`} :
          {backgroundImage: `url(${URL.createObjectURL(imgData)})`}
        }
      >
        {showUpperBubble && (
          <div
            className={cardType === 'description' ? descriptionStyles.rootTime: styles.rootTime}
          >
            {customUpperBubbleText ?? time}
          </div>
        )}
        <EventInfoText data={{ datetime, short_name, place, age_restriction }} cardType={cardType} />
        {!!showActionButton && (
          <Button
            className={cardType === 'description' ? descriptionStyles.buttonBuy : styles.buttonBuy}
            text={customActionButtonText ?? 'Купить билет'}
            type="realBlue"
            onClick={customActionButtonAction ?? buyTickets}
          />
        )}

        {cardType === 'userPage' && (
          <EventQr
            eventId={event_id}
            isModalOpen={isQrModalOpen}
            setIsModalOpen={setIsQrModalOpen}
          />
        )}
      </div>

      {cardType !== 'description' && (
          <Drawer
            variant='temporary'
            anchor='bottom'
            open={isEventDetailsModalOpen}
            onClose={() => toggleEventDetailsModal(false)}
          >
            <div style={{height: '60vh'}}>
              <EventDetailsPage
                eventId={event_id}
              />
            </div>
          </Drawer>
        )}
    </>
  )
}

export default EventCard
