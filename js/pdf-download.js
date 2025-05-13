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
    // Create download button loading state
    const downloadBtn = document.getElementById('downloadPDF');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = 'Generando PDF...';
    downloadBtn.disabled = true;

    try {
        // Trigger hover states and wait for animations
        triggerHoverStates();
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Configure PDF options
        const element = document.body;
        const opt = {
            margin: 0,
            filename: 'HojaDeVida_GermanGarciaPerez.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { 
                scale: 3,
                useCORS: true,
                logging: false,
                scrollY: 0,
                windowWidth: document.documentElement.scrollWidth,
                windowHeight: document.documentElement.scrollHeight
            },
            jsPDF: { 
                unit: 'px', 
                format: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
                orientation: 'portrait',
                hotfixes: ['px_scaling']
            }
        };

        // Generate PDF
        await html2pdf().set(opt).from(element).save();

        // Reset states
        resetHoverStates();

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error al generar el PDF. Por favor intente nuevamente.');
    } finally {
        // Reset button state
        downloadBtn.innerHTML = originalText;
        downloadBtn.disabled = false;
    }
}
