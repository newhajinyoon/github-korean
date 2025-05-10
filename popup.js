document.addEventListener('DOMContentLoaded', function () {
    const sourceButton = document.getElementById('source');
    const contactButton = document.getElementById('contact');

    sourceButton.addEventListener('click', function () {
        window.open('https://github.com/newhajinyoon/github-korean', '_blank');
    });

    contactButton.addEventListener('click', function () {
        window.open('https://discord.com/users/834253879990157312', '_blank');
    });
});
