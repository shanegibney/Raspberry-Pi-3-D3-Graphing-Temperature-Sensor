d3.selectAll('.hover-me')
    .on('mouseover', function() {
	this.style.backgroundColor = 'yellow';
    })
    .on('mouseleave', function() {
	this.style.backgroundColor = '';
    });
