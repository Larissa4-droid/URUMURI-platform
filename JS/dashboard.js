const API_BASE = "https://urumuri-platform.onrender.com/api"; 
let myChart = null; // Variable to store our chart instance

async function updateDashboard() {
    try {
        const res = await fetch(`${API_BASE}/posts`);
        if (!res.ok) throw new Error("Failed to fetch");
        const posts = await res.json();
        
        // 1. Update Basic Stats
        const totalPosts = posts.length;
        const uniqueAuthors = [...new Set(posts.map(p => p.user_id))].length;

        document.getElementById("totalPosts").innerText = totalPosts;
        document.getElementById("activeUsers").innerText = uniqueAuthors;
        
        // 2. Process Tags for the Chart
        const tagsMap = {};
        posts.forEach(p => {
            if(p.tag) {
                // Clean up tag (remove # and spaces)
                const cleanTag = p.tag.replace('#', '').trim().toUpperCase();
                if(cleanTag) {
                    tagsMap[cleanTag] = (tagsMap[cleanTag] || 0) + 1;
                }
            }
        });

        // Sort tags (Highest count first)
        const sortedTags = Object.entries(tagsMap)
            .sort((a,b) => b[1] - a[1])
            .slice(0, 5); // Get top 5

        // 3. Update the List
        const issuesList = document.getElementById("topIssues");
        issuesList.innerHTML = "";
        sortedTags.forEach(([tag, count]) => {
            const li = document.createElement("li");
            li.innerHTML = `<span style="font-weight:bold;">#${tag}</span> <span style="float:right; color:#71767b">${count} reports</span>`;
            li.style.padding = "8px 0";
            li.style.borderBottom = "1px solid #2f3336";
            issuesList.appendChild(li);
        });

        // 4. Render/Update the Chart
        renderChart(sortedTags);

    } catch (e) {
        console.error("Dashboard Error:", e);
    }
}

function renderChart(data) {
    const ctx = document.getElementById('trendsChart').getContext('2d');
    const labels = data.map(item => "#" + item[0]);
    const values = data.map(item => item[1]);

    // If chart exists, just update data (animation effect)
    if (myChart) {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = values;
        myChart.update();
    } else {
        // Create new chart
        myChart = new Chart(ctx, {
            type: 'bar', // You can change this to 'pie' or 'line'
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Reports',
                    data: values,
                    backgroundColor: [
                        'rgba(29, 155, 240, 0.7)', // Twitter Blue
                        'rgba(0, 186, 124, 0.7)',  // Green
                        'rgba(255, 212, 0, 0.7)',  // Yellow
                        'rgba(249, 24, 128, 0.7)', // Pink
                        'rgba(120, 86, 255, 0.7)'  // Purple
                    ],
                    borderColor: [
                        'rgba(29, 155, 240, 1)',
                        'rgba(0, 186, 124, 1)',
                        'rgba(255, 212, 0, 1)',
                        'rgba(249, 24, 128, 1)',
                        'rgba(120, 86, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false } // Hide legend for cleaner look
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#2f3336' }, // Dark grid lines
                        ticks: { color: '#e7e9ea', stepSize: 1 }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#e7e9ea' }
                    }
                }
            }
        });
    }
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    updateDashboard();
    
    // Auto-refresh every 5 seconds to make it feel "Active"
    setInterval(updateDashboard, 5000);
});