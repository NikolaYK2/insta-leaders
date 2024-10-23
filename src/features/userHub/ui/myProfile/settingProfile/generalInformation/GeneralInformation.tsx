import React from 'react'
import { Page } from '@/common/components/page'
import {
  InputDataPicker,
  Selector,
  TextField,
  useSelectedCalendar,
  SelectItem,
  Button,
  Typography,
  TypographyVariant,
} from '@nikolajk2/lib-insta-leaders'
import { AddProfilePhoto } from '../addProfileFoto/AddProfilePhoto'

const textFields = [{ label: 'Username*' }, { label: 'First Name*' }, { label: 'Last Name*' }]
export const GeneralInformation = () => {
  const { selectedDate, setSelectedDate } = useSelectedCalendar()

  return (
    <Page titleMeta={'General information'} descriptionMeta={'info'} className={'px-0'}>
      <div className={'flex justify-between'}>
        <div className={'border-2 border-red-800 mr-1'}>
       <AddProfilePhoto />
          {/* <div
            className={
              'w-[192px] h-[192px] border-2 border-cyan-50 rounded-full mb-[30px] mt-[25px]'
            }
          ></div>
          <Button variant={'outline'}>
            <Typography variant={TypographyVariant.h3}>Add a Profile Photo</Typography>
          </Button> */}
        </div>
        <form className={'flex flex-col max-w-[740px] w-full'}>
          {textFields.map(field => (
            <TextField className={'mb-6 w-full'} key={field.label} label={field.label} />
          ))}
          <InputDataPicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            labelInput={'Date of birth'}
            sideOffsetContent={-19}
          />
          <div className={'flex justify-between mt-9'}>
            <Selector className={'max-w-[358px] mr-1'} defaultValue={'1'}>
              <SelectItem value={'1'} />
            </Selector>
            <Selector className={'max-w-[358px]'} defaultValue={'1'}>
              <SelectItem value={'1'} />
            </Selector>
          </div>

          <textarea className={'w-full mt-9 bg-dark-300 text-light-100'} />
          <div className={'border-[1px] border-dark-300 my-7'} />
          <Button className={'ml-auto'}>
            <Typography variant={TypographyVariant.h3}>Save Changes</Typography>
          </Button>
        </form>
      </div>
    </Page>
  )
}
