import { FC, useState } from 'react'
import { Box, Table, Switch } from '@concepta/react-material-ui'
import {
  RowsProps,
  SimpleActionButton,
  SimpleOptionButton,
} from '@concepta/react-material-ui/dist/components/Table/Table'
import ScreenWithContainer from 'app/components/ScreenWithContainer'
import { rows, headers } from './fakeData'
import { CustomNameCell, CustomStatusCell } from './CustomCells'
// import CustomToolbarActionButtons from './CustomToolbarActionButtons'
// import CustomRowOptions from './CustomRowOptions'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const TableScreen: FC = () => {
  const [showCheckboxes, setShowCheckboxes] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'checkboxes') {
      return setShowCheckboxes(!showCheckboxes)
    }
    return setShowOptions(!showOptions)
  }

  const customRows: () => RowsProps[] = () => {
    return rows.map(row => {
      const { id, name, email, status, role, lastLogin } = row

      return {
        id,
        name: {
          sortableValue: name,
          component: <CustomNameCell name={name} email={email} />,
        },
        status: {
          sortableValue: status,
          component: <CustomStatusCell status={status} />,
        },
        role,
        lastLogin,
      }
    })
  }

  const actionButtons: SimpleActionButton[] = [
    {
      key: 'edit',
      onClick: ({ selectedRows }) => console.log('Edit rows:', selectedRows),
      renderItem: <EditIcon />,
    },

    {
      key: 'delete',
      onClick: ({ selectedRows }) => console.log('Delete rows:', selectedRows),
      renderItem: <DeleteIcon />,
    },
  ]

  const optionButtons: SimpleOptionButton[] = [
    {
      key: 'edit',
      onClick: row => console.log('row:', row),
      renderItem: <EditIcon />,
    },
    {
      key: 'delete',
      onClick: row => console.log('row:', row),
      renderItem: <DeleteIcon />,
    },
    {
      key: 'click',
      onClick: row => console.log('row:', row),
      renderItem: 'click',
    },
  ]

  return (
    <ScreenWithContainer currentId="table">
      <Box display="flex">
        <Box>
          <Switch
            sx={{ margin: '0 auto' }}
            name="checkboxes"
            checked={showCheckboxes}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Checkboxes
        </Box>
        <Box>
          <Switch
            sx={{ margin: '0 auto' }}
            name="options"
            checked={showOptions}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Options
        </Box>
      </Box>

      <Table
        rows={customRows()}
        headers={headers}
        hasCheckboxes={showCheckboxes}
        hasOptions={showOptions}
        //
        // customToolbarActionButtons={({ selectedRows }) => ( // Custom toolbar component
        //   <CustomToolbarActionButtons selectedRows={selectedRows} />
        // )}
        //
        customToolbarActionButtons={actionButtons} // Custom Toolbar items
        //
        // customRowOptions={({ row, close }) => ( // Custom options component
        //   <CustomRowOptions row={row} close={close} />
        // )}
        //
        customRowOptions={optionButtons} // Custom options items
      />
    </ScreenWithContainer>
  )
}

export default TableScreen
