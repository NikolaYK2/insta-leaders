import React from 'react'
import { Page } from '@/common/components/page'
import {
  InputDataPicker,
  Selector,
  TextField,
  useSelectedCalendar,
  SelectItem,
} from '@nikolajk2/lib-insta-leaders'

export const GeneralInformation = () => {
  const { selectedDate, setSelectedDate } = useSelectedCalendar()

  return (
    <Page titleMeta={'General information'} descriptionMeta={'info'}>
      <div>
        <div></div>
        <form>
          <TextField className={'h-9'} />
          <TextField className={'h-9'} />
          <TextField className={'h-9'} />
          <InputDataPicker
            selected={selectedDate}
            onSelect={setSelectedDate}
            labelInput={'Date of birth'}
          />
          <div className={'flex'}>
            <Selector defaultValue={'1'}>
              <SelectItem value={'1'} />
            </Selector>
            <Selector defaultValue={'1'}>
              <SelectItem value={'1'} />
            </Selector>
          </div>
        </form>
      </div>
    </Page>
  )
}
