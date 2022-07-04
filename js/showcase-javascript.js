/*
document.addEventListener("DOMContentLoaded", function(event) { 
	const showcase = document.getElementById("showcase");
	const scrollProgress = document.getElementById('showcase-scrollbar');
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let temp = 0;
	temp = showcase.offsetHeight-100;
	window.addEventListener('scroll', () => {
	  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	  scrollProgress.style.height = `${(scrollTop / height) * temp}px`;
	});
});
*/
