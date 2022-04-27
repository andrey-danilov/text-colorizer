import FileSaver from 'file-saver'

export function downloadFile (data, fileType = 'text/plain', fileName = 'text.json') {
	const blob = new Blob([data], {type: fileType});
	FileSaver.saveAs(blob, fileName);
}
