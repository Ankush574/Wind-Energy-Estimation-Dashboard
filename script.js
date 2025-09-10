
const monthly = [4.5,5.1,5.6,6.2,6.8,7.2,6.9,6.4,6.0,5.5,5.0,4.6];
const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];


const ctx = document.getElementById('windChart');
new Chart(ctx, {
  type: 'line',
  data: {
    labels,
    datasets: [{
      label: 'Avg wind (m/s)',
      data: monthly,
      tension: 0.35,
      fill: true,
      borderColor: '#007bff',
      backgroundColor: 'rgba(0,123,255,0.1)',
      borderWidth: 2,
      pointRadius: 3
    }]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true, suggestedMax: 10 } },
    plugins: { legend: { display: true } }
  }
});


function estimateEnergy(avgV,D,Cp,availPercent){
  const rho = 1.225;
  const A = Math.PI*Math.pow(D/2,2);
  const P_watts = 0.5*rho*A*Cp*Math.pow(avgV,3);
  const annual_kWh = (P_watts*8760*(availPercent/100))/1000;
  const ratedCapacity_kW = (P_watts/1000);
  const capacityFactor = Math.min(1, (annual_kWh/(ratedCapacity_kW*8760)))||0;
  return {P_watts, annual_kWh, ratedCapacity_kW, capacityFactor};
}


function siteScore(avgV,D,availPercent){
  const windScore=Math.min(10,(avgV/8)*10);
  const rotorScore=Math.min(10,(D/120)*10);
  const availScore=Math.min(10,(availPercent/95)*10);
  const total=(windScore*0.6+rotorScore*0.25+availScore*0.15);
  return Math.round(total*10)/10;
}


document.getElementById('estimateBtn').addEventListener('click',()=>{
  const avgV=parseFloat(document.getElementById('avgWind').value)||0;
  const D=parseFloat(document.getElementById('rotor').value)||0;
  const Cp=parseFloat(document.getElementById('cp').value)||0.4;
  const avail=parseFloat(document.getElementById('avail').value)||90;

  const res=estimateEnergy(avgV,D,Cp,avail);
  const score=siteScore(avgV,D,avail);

  document.getElementById('powerBox').innerText=(res.P_watts/1000).toFixed(2)+" kW";
  document.getElementById('energyBox').innerText=res.annual_kWh.toLocaleString(undefined,{maximumFractionDigits:0})+" kWh";
  document.getElementById('cfBox').innerText=(res.capacityFactor*100).toFixed(1)+"%";
  document.getElementById('scoreBox').innerText=score+" / 10";
});
