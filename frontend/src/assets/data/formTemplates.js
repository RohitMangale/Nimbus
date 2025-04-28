// formTemplates.js
export const formTemplates = {
    maintenance: {
      title: 'Maintenance Checklist',
      fields: [
        { name: 'equipmentId', label: 'Equipment ID', type: 'text', required: true },
        { name: 'maintenanceDate', label: 'Maintenance Date', type: 'date', required: true },
        { name: 'technicianName', label: 'Technician Name', type: 'text', required: true },
        { name: 'status', label: 'Current Status', type: 'select', options: ['Operational', 'Requires Repair', 'Replaced'], required: true },
        { name: 'nextScheduled', label: 'Next Scheduled Maintenance', type: 'date' },
        { name: 'remarks', label: 'Remarks', type: 'textarea' },
        { name: 'photoUpload', label: 'Upload Equipment Image', type: 'file' },
        { name: 'reportUpload', label: 'Upload Maintenance Report (PDF)', type: 'file' },
      ],
    },
  
    testing: {
      title: 'Testing Report',
      fields: [
        { name: 'testId', label: 'Test ID', type: 'text', required: true },
        { name: 'testDate', label: 'Test Date', type: 'date', required: true },
        { name: 'testerName', label: 'Tester Name', type: 'text', required: true },
        { name: 'result', label: 'Result', type: 'select', options: ['Pass', 'Fail'], required: true },
        { name: 'confidenceLevel', label: 'Confidence Level (%)', type: 'number' },
        { name: 'testNotes', label: 'Test Notes', type: 'textarea' },
        { name: 'dataSheetUpload', label: 'Upload Test Datasheet (PDF)', type: 'file' },
        { name: 'imageUpload', label: 'Upload Visual Evidence (JPG/PNG)', type: 'file' },
      ],
    },
  };
  