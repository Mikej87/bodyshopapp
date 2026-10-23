/**
 * UK Bodyshop Management System - Core Logic
 */

// Tab switching engine
function switchTab(targetTabId) {
    // Hide all tab content blocks
    document.querySelectorAll('.tab-content').forEach(element => {
        element.classList.replace('block', 'hidden');
    });
    
    // Show the target tab block
    const targetContent = document.getElementById(`content-${targetTabId}`);
    if (targetContent) {
        targetContent.classList.replace('hidden', 'block');
    }

    // Reset UI states on all tab navigation buttons
    document.querySelectorAll('.id-tab').forEach(btn => {
        btn.className = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 id-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2";
    });
    
    // Highlight the active navigation tab
    const activeTab = document.getElementById(`tab-${targetTabId}`);
    if (activeTab) {
        activeTab.className = "border-indigo-500 text-indigo-600 id-tab whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2";
    }
}

// UK Compliant VAT & Labour Calculator Engine
function calculateInvoice() {
    // Gather numeric values from input fields safely
    const hourlyRate = parseFloat(document.getElementById('input-rate')?.value) || 0;
    const hoursUsed = parseFloat(document.getElementById('input-hours')?.value) || 0;
    const partsCost = parseFloat(document.getElementById('input-parts')?.value) || 0;
    const materialsCost = parseFloat(document.getElementById('input-materials')?.value) || 0;

    // Operational breakdown calculations
    const totalLabourNet = hourlyRate * hoursUsed;
    const totalNetSummary = totalLabourNet + partsCost + materialsCost;
    const UK_VAT_RATE = 0.20; // 20% Standard UK VAT Rate
    const computedVat = totalNetSummary * UK_VAT_RATE;
    const totalGrossSummary = totalNetSummary + computedVat;

    // Helper function to safely format numbers to GBP currency
    const formatGBP = (amount) => `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Dynamically update text rows on the live invoice preview
    updateElementText('inv-lbl-rate', formatGBP(hourlyRate));
    updateElementText('inv-lbl-hours', `${hoursUsed} hrs`);
    updateElementText('inv-lbl-total', formatGBP(totalLabourNet));
    updateElementText('inv-parts-total', formatGBP(partsCost));
    updateElementText('inv-materials-total', formatGBP(materialsCost));

    // Update bottom invoice summary panels
    updateElementText('summary-subtotal', formatGBP(totalNetSummary));
    updateElementText('summary-vat', formatGBP(computedVat));
    updateElementText('summary-gross', formatGBP(totalGrossSummary));
}

// Helper utility to safely update element text content if the element exists
function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.innerText = text;
    }
}

// Live Header Clock (Updates every second to London/UK Time)
function startLiveClock() {
    const clockElement = document.getElementById('live-clock');
    if (!clockElement) return;

    setInterval(() => {
        const options = { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        clockElement.innerText = new Date().toLocaleTimeString('en-GB', options) + ' BST';
    }, 1000);
}

// Global initialization when the page finishes loading
window.addEventListener('DOMContentLoaded', () => {
    calculateInvoice();
    startLiveClock();
});