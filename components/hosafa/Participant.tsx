import { useEffect, useState } from 'react';
import { participant } from '../../models/paritData';

import Image from 'next/image';
import hod from '../../public/images/הוד.png';
import daniel from '../../public/images/דניאל.png';
import maayan from '../../public/images/מעיין.png';
import omri from '../../public/images/עומרי.png';
import Dispatcher from '../../models/dispatcher';

const Participant: React.FC<{
  id: string;
  person: string;
  participants: [participant[], Dispatcher<participant[]>];
}> = (props) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [participants, setParticipants] = props.participants;

  useEffect(() => {
    if (participants.length === 0) {
      setChecked(false);
    }
  }, [participants]);

  const pickPic = {
    hod: hod,
    daniel: daniel,
    maayan: maayan,
    omri: omri,
  };

  const selectHandler = () => {
    const newParticipants = participants;

    if (!checked) {
      newParticipants.push({
        id: props.id,
        person: props.person,
      });
      setParticipants(newParticipants);
    } else {
      const participantIdx = newParticipants.findIndex(
        (p) => p?.id === props.id
      );
      newParticipants.splice(participantIdx, 1);

      setParticipants(newParticipants);
    }
  };

  const colorByName = {
    hod: '!text-hod',
    daniel: '!text-daniel',
    maayan: '!text-maayan',
    omri: '!text-omri',
  };

  return (
    <div className='flex justify-center col-span-1'>
      <input
        type='checkbox'
        id={props.id}
        className='hidden'
        onChange={() => {
          setChecked((prevChecked) => !prevChecked);
        }}
      />
      <label
        onClick={selectHandler}
        htmlFor={props.id}
        className='h-full w-full'
      >
        <Image
          className={`${
            colorByName[props.id as keyof typeof colorByName]
          } cursor-pointer hover:animate-wiggle hover:drop-shadow-participant ${
            checked ? `drop-shadow-participant hover:animate-none` : ''
          }`}
          width={128}
          height={128}
          // fill
          src={pickPic[props.id as keyof typeof pickPic]}
          alt={props.id}
        ></Image>
      </label>
    </div>
  );
};

export default Participant;
