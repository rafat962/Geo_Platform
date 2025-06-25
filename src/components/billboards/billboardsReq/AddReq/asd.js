document.addEventListener('DOMContentLoaded', function() {
    // تعريف نماذج السيارات لكل شركة مصنعة
    const models = {
        toyota: ['Corolla', 'Camry', 'RAV4', 'Prius'],
        honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
        ford: ['Fiesta', 'Focus', 'Mustang', 'Explorer'],
        bmw: ['3 Series', '5 Series', 'X3', 'X5']
    };
    
    // إضافة حدث النقر لخطوات التقدم
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع الخطوات
            steps.forEach(s => s.classList.remove('active'));
            // إضافة الفئة النشطة للخطوة المحددة
            this.classList.add('active');
            
            // هنا يمكنك إضافة منطق لتغيير المحتوى بناءً على الخطوة المحددة
            // مثلاً: عرض نموذج مختلف لكل خطوة
        });
    });
    
    // تحديث نماذج السيارات عند تغيير الشركة المصنعة
    const manufacturerSelect = document.getElementById('manufacturer');
    const modelSeriesSelect = document.getElementById('model-series');
    
    manufacturerSelect.addEventListener('change', function() {
        const selectedManufacturer = this.value;
        modelSeriesSelect.innerHTML = '<option value="">Select Model Series</option>';
        
        if (selectedManufacturer && models[selectedManufacturer]) {
            models[selectedManufacturer].forEach(model => {
                const option = document.createElement('option');
                option.value = model.toLowerCase().replace(' ', '-');
                option.textContent = model;
                modelSeriesSelect.appendChild(option);
            });
        }
    });
});