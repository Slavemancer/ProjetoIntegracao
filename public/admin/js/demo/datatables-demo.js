// Call the dataTables jQuery plugin
$(document).ready(function() {
    $('#dataTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": true,
    });
});