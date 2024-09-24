import { BooleanLike } from 'common/react';
import { useBackend, useLocalState, useSharedState } from '../backend';
import { Button, LabeledList, Section, Tabs, Icon, Stack, Box, Slider } from '../components';
import { Window } from '../layouts';
import { classes } from 'common/react';

const GENDERS = [
  { name: 'Male', icon: 'mars' },
  { name: 'Female', icon: 'venus' },
  { name: 'Genderless', icon: 'genderless' },
];

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

type Data = {
  ai_tracking: BooleanLike;
  associated_account_number: number;
  age: number;
  registered_name: string;
  sex: string;
  blood_type: string;
  dna_hash: string;
  fingerprint_hash: string;
  photo: string;
  assignment: string;
  job_icon: string;
  idcards: IDCard[];
};

type IDCard = {
  name: string;
};

const unset = 'Empty';
const InfoInput = ({ label, value, onCommit, onClick, onRClick, tooltip }) => (
  <LabeledList.Item label={label}>
    <Stack fill mb={-0.5}>
      <Stack.Item grow>
        <Button.Input fluid textAlign="center" content={value || unset} onCommit={onCommit} />
      </Stack.Item>
      <Stack.Item>
        <Button
          icon="file-signature"
          tooltip={tooltip}
          tooltipPosition={'bottom-end'}
          onClick={onClick}
          onContextMenu={onRClick}
        />
      </Stack.Item>
    </Stack>
  </LabeledList.Item>
);

export const AgentCard = (props, context) => {
  const [tabIndex, setTabIndex] = useLocalState(context, 'tabIndex', 0);
  const decideTab = (index) => {
    switch (index) {
      case 0:
        return <AgentCardInfo />;
      case 1:
        return <AgentCardAppearances />;
      default:
        return <AgentCardInfo />;
    }
  };

  return (
    <Window width={430} height={500} theme="syndicate">
      <Window.Content>
        <Stack fill vertical>
          <Stack.Item textAlign="center">
            <Tabs fluid>
              <Tabs.Tab key="Card Info" selected={0 === tabIndex} onClick={() => setTabIndex(0)}>
                <Icon name="table" /> Card Info
              </Tabs.Tab>
              <Tabs.Tab key="Appearance" selected={1 === tabIndex} onClick={() => setTabIndex(1)}>
                <Icon name="id-card" /> Appearance
              </Tabs.Tab>
            </Tabs>
          </Stack.Item>
          {decideTab(tabIndex)}
        </Stack>
      </Window.Content>
    </Window>
  );
};

export const AgentCardInfo = (props, context) => {
  const { act, data } = useBackend<Data>(context);
  const {
    registered_name,
    sex,
    age,
    assignment,
    job_icon,
    associated_account_number,
    blood_type,
    dna_hash,
    fingerprint_hash,
    photo,
    ai_tracking,
  } = data;

  const tooltipText = (
    <span>
      Autofill options.
      <br />
      LMB - Autofill your own data.
      <br />
      RMB - Autofill someone else.
    </span>
  );

  return (
    <>
      <Stack.Item>
        <Section title="Card Info">
          <LabeledList>
            <InfoInput
              label="Name"
              value={registered_name}
              tooltip={tooltipText}
              onCommit={(e, value) => act('change_name', { name: value })}
              onClick={() => act('change_name', { option: 'Primary' })}
              onRClick={(event) => {
                event.preventDefault();
                act('change_name', { option: 'Secondary' });
              }}
            />
            <LabeledList.Item label="Sex">
              <Stack fill mb={-0.5}>
                {GENDERS.map((gender) => (
                  <Stack.Item grow key={gender.name}>
                    <Button
                      fluid
                      icon={gender.icon}
                      content={gender.name}
                      selected={sex === gender.name}
                      onClick={() => act('change_sex', { sex: gender.name })}
                    />
                  </Stack.Item>
                ))}
              </Stack>
            </LabeledList.Item>
            <LabeledList.Item label="Age">
              <Slider
                fluid
                minValue={17}
                value={age || 0}
                maxValue={300}
                onChange={(e, value) => act('change_age', { age: value })}
              />
            </LabeledList.Item>
            <LabeledList.Item label="Rank">
              <Button fluid onClick={() => act('change_occupation')} textAlign="middle">
                <Box className={classes(['job_icons16x16', job_icon])} verticalAlign="bottom" my="2px" />{' '}
                {assignment ? assignment : '[UNSET]'}
              </Button>
            </LabeledList.Item>
            <InfoInput
              label="Fingerprint"
              value={fingerprint_hash}
              tooltip="Ввести свои отпечатки."
              onCommit={(e, value) => act('change_fingerprints', { new_fingerprints: value })}
              onClick={() => act('change_fingerprints', { option: 'Primary' })}
              onRClick={() => act('change_fingerprints', { option: 'Primary' })}
            />
            <LabeledList.Item label="Blood Type">
              <Stack fill mb={-0.5}>
                {BLOOD_TYPES.map((type) => (
                  <Stack.Item grow key={type}>
                    <Button
                      fluid
                      content={type}
                      selected={blood_type === type}
                      onClick={() => act('change_blood_type', { new_type: type })}
                    />
                  </Stack.Item>
                ))}
              </Stack>
            </LabeledList.Item>
            <InfoInput
              label="DNA"
              value={dna_hash}
              onCommit={(e, value) => act('change_dna_hash', { new_dna: value })}
              onClick={() => act('change_dna_hash', { option: 'Primary' })}
              onRClick={() => act('change_dna_hash', { option: 'Primary' })}
              tooltip="Ввести своё ДНК."
            />
            <InfoInput
              label="Account"
              value={associated_account_number || 0}
              onCommit={(e, value) => act('change_money_account', { new_account: value })}
              onClick={() => act('change_money_account', { option: 'Primary' })}
              onRClick={() => act('change_money_account', { option: 'Primary' })}
              tooltip="Ввести случайный набор цифр."
            />
            <LabeledList.Item label="Photo">
              <Button fluid textAlign="center" content={photo ? 'Update' : unset} onClick={() => act('change_photo')} />
            </LabeledList.Item>
          </LabeledList>
        </Section>
      </Stack.Item>
      <Stack.Item grow>
        <Section fill title="Card Settings">
          <LabeledList>
            <LabeledList.Item label="Card Info">
              <Button.Confirm
                fluid
                textAlign="center"
                content="Delete Card Info"
                confirmContent="Are you sure?"
                onClick={() => act('delete_info')}
              />
            </LabeledList.Item>
            <LabeledList.Item label="Access">
              <Button.Confirm
                fluid
                textAlign="center"
                content="Reset Access"
                confirmContent="Are you sure?"
                onClick={() => act('clear_access')}
              />
            </LabeledList.Item>
            <LabeledList.Item label="AI Tracking">
              <Button
                fluid
                textAlign="center"
                content={ai_tracking ? 'Untrackable' : 'Trackable'}
                onClick={() => act('change_ai_tracking')}
              />
            </LabeledList.Item>
          </LabeledList>
        </Section>
      </Stack.Item>
    </>
  );
};

export const AgentCardAppearances = (props, context) => {
  const { act, data } = useBackend<Data>(context);
  const [selectedAppearance, setSelectedAppearance] = useSharedState(context, 'selectedAppearance', null);
  const { idcards } = data;
  return (
    <Stack.Item grow>
      <Section fill scrollable title={'Card Appearance'}>
        {idcards.map((idcard) => (
          <Button
            m={0.5}
            compact
            color={'translucent'}
            key={idcard.name}
            selected={idcard.name === selectedAppearance}
            tooltip={idcard.name}
            className={classes(['idcards64x64', idcard.name])}
            onClick={() => {
              setSelectedAppearance(idcard.name);
              act('change_appearance', {
                new_appearance: idcard.name,
              });
            }}
          />
        ))}
      </Section>
    </Stack.Item>
  );
};
