function triggerHoverStates() {
    // Find all elements with hover effects and trigger them
    const hoverElements = document.querySelectorAll('.project-wrapper, [data-aos]');
    hoverElements.forEach(element => {
        // Trigger hover state
        element.classList.add('active');
        // Ensure AOS animations are completed
        element.classList.add('aos-animate');
    });
}

function resetHoverStates() {
    const hoverElements = document.querySelectorAll('.project-wrapper, [data-aos]');
    hoverElements.forEach(element => {
        element.classList.remove('active');
    });
}

async function generatePDF() {
    const downloadBtn = document.getElementById('downloadPDF');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = 'Generando PDF...';
    downloadBtn.disabled = true;

    try {
        triggerHoverStates();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Seleccionar todo el contenido hasta el final del footer
        const footer = document.getElementById('footer');
        const contentHeight = footer.offsetTop + footer.offsetHeight;
        
        // Crear un contenedor temporal
        const container = document.createElement('div');
        const content = Array.from(document.body.children).filter(el => {
            return el.offsetTop <= contentHeight;
        });
        content.forEach(el => container.appendChild(el.cloneNode(true)));

        const opt = {
            margin: 0,
            filename: 'HojaDeVida_GermanGarciaPerez.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { 
                scale: 3,
                useCORS: true,
                logging: false,
                scrollY: 0,
                height: contentHeight,
                windowWidth: document.documentElement.scrollWidth,
            },
            jsPDF: { 
                unit: 'px', 
                format: [document.documentElement.scrollWidth, contentHeight],
                orientation: 'portrait',
                hotfixes: ['px_scaling']
            }
        };

        await html2pdf().set(opt).from(container).save();
        
        // Reset states
        resetHoverStates();
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error al generar el PDF. Por favor intente nuevamente.');
    } finally {
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}
