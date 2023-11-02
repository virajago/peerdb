import { CopyButton } from '@/components/CopyButton';
import { SlotInfo, StatInfo } from '@/grpc_generated/route';
import { Label } from '@/lib/Label';
import { Table, TableCell, TableRow } from '@/lib/Table';
import { DurationDisplay, SlotNameDisplay } from './helpers';

export const SlotTable = ({ data }: { data: SlotInfo[] }) => {
  return (
    <div style={{ height: '30%', marginTop: '2rem', marginBottom: '1rem' }}>
      <Label as='label' variant='headline' style={{ marginBottom: '1rem' }}>
        Replication Slot Information
      </Label>
      <div
        style={{
          maxHeight: '100%',
          overflow: 'scroll',
          background: 'linear-gradient(ghostwhite,#f5f7ff)',
          padding: '1rem',
          borderRadius: '1rem',
          boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)',
        }}
      >
        <Table
          header={
            <TableRow>
              <TableCell as='th'>Slot Name</TableCell>
              <TableCell as='th'>Active</TableCell>
              <TableCell as='th'>Redo LSN</TableCell>
              <TableCell as='th'>Restart LSN</TableCell>
              <TableCell as='th'>Lag (In MB)</TableCell>
            </TableRow>
          }
        >
          {data.map(({ slotName, active, redoLSN, restartLSN, lagInMb }) => {
            return (
              <TableRow key={slotName}>
                <TableCell>
                  <SlotNameDisplay slotName={slotName} />
                </TableCell>
                <TableCell>{active ? 'Yes' : 'No'}</TableCell>
                <TableCell>{redoLSN}</TableCell>
                <TableCell>{restartLSN}</TableCell>
                <TableCell>{lagInMb}</TableCell>
              </TableRow>
            );
          })}
        </Table>
      </div>
    </div>
  );
};

export const StatTable = ({ data }: { data: StatInfo[] }) => {
  return (
    <div style={{ height: '50%' }}>
      <Label as='label' variant='headline' style={{ marginBottom: '1rem' }}>
        Stat Activity Information
      </Label>
      <div
        style={{
          maxHeight: '100%',
          overflow: 'scroll',
          background: 'linear-gradient(ghostwhite,#f5f7ff)',
          padding: '1rem',
          borderRadius: '1rem',
          boxShadow: '2px 2px 4px 2px rgba(0,0,0,0.1)',
        }}
      >
        <Table
          header={
            <TableRow>
              <TableCell as='th'>PID</TableCell>
              <TableCell as='th'>Duration</TableCell>
              <TableCell as='th'>Wait Event</TableCell>
              <TableCell as='th'>Wait Event Type</TableCell>
              <TableCell as='th'>Query Start Time</TableCell>
              <TableCell as='th'>Query</TableCell>
            </TableRow>
          }
        >
          {data.map((stat) => (
            <TableRow key={stat.pid}>
              <TableCell>{stat.pid}</TableCell>
              <TableCell>
                <DurationDisplay duration={stat.duration} />
              </TableCell>
              <TableCell>{stat.waitEvent || 'N/A'}</TableCell>
              <TableCell>{stat.waitEventType || 'N/A'}</TableCell>
              <TableCell>{stat.queryStart || 'N/A'}</TableCell>
              <TableCell>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'monospace',
                    fontSize: 15,
                  }}
                >
                  {stat.query}
                  <CopyButton text={stat.query} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </div>
  );
};