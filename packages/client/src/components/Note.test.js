import renderer from 'react-test-renderer'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'DPG-Code',
    important: true
  }

  const component = renderer(<Note note={note}/>)

  component.getByText('DPG-Code')
})