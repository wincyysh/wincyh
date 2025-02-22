async function fetchGitHubRepos() {
  try {
    const response = await fetch('https://api.github.com/users/wincyysh/repos');
    const repos = await response.json();
    
    const reposContainer = document.getElementById('repos-container');
    if (!reposContainer) return;
    
    repos.forEach(repo => {
      const repoCard = document.createElement('div');
      repoCard.className = 'card mb-3 clickable-card';
      
      repoCard.innerHTML = `
        <a href="${repo.html_url}"  target="_blank">
          <div class="card-body">
            <h5 class="card-title">${repo.name}</h5>
            <p class="card-text">${repo.description || 'No description available'}</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </a>
      `;
      
      reposContainer.appendChild(repoCard);
    });
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
  }
}


async function fetchMediumPosts() {
  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@wincy.yingshi.huang');
    const data = await response.json();
    
    const postsContainer = document.getElementById('medium-posts');
    if (!postsContainer) return;
    
    data.items.forEach(post => {
      const postCard = document.createElement('div');
      postCard.className = 'card mb-3 clickable-card';
      postCard.onclick = () => window.open(post.link, '_blank');
      
      postCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text text-muted">${new Date(post.pubDate).toLocaleDateString()}</p>
          <p class="card-text">${post.description.slice(0, 150)}...</p>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="badge bg-primary">Medium</span>
              <span class="badge bg-secondary">${post.categories.join(', ')}</span>
            </div>
          </div>
        </div>
      `;
      
      postsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    if (postsContainer) {
      postsContainer.innerHTML = `
        <div class="alert alert-danger">
          Error loading Medium articles. Please try again later.
        </div>
      `;
    }
  }
}


const tableauViews = [
  {
    title: 'Education Level',
    id: 'viz1740189226512',
    name: 'EducationLevelNameAndColor/Sheet14',
    imageUrl: 'https://public.tableau.com/static/images/Ed/EducationLevelNameAndColor/Sheet14/1.png'
  },
  {
    title: 'Attainment by Educational Level',
    id: 'viz1740189236794',
    name: 'AttainmentPercentage20052023/attainmentPercentage2005_2023',
    imageUrl: 'https://public.tableau.com/static/images/At/AttainmentPercentage20052023/attainmentPercentage2005_2023/1.png'
  },
  {
    title: 'Expenditure by Education Level',
    id: 'viz1740189246809',
    name: 'ExpenditureEducation/ExpenditureLines',
    imageUrl: 'https://public.tableau.com/static/images/Ex/ExpenditureEducation/ExpenditureLines/1.png'
  },
  {
    title: 'Expenditure Details',
    id: 'viz1740189294535',
    name: 'DataSourceExpenditureEducation/ExpenditureEducationText',
    imageUrl: 'https://public.tableau.com/static/images/Da/DataSourceExpenditureEducation/ExpenditureEducationText/1.png'
  },
  {
    title: 'Attainment Details',
    id: 'viz1740189304257',
    name: 'DataSourceAttainmentPercentage20052023/attainmentPercentage2005_20232',
    imageUrl: 'https://public.tableau.com/static/images/Da/DataSourceAttainmentPercentage20052023/attainmentPercentage2005_20232/1.png'
  },
  {
    title: 'Annual Earnings',
    id: 'viz1740189316479',
    name: 'DataSourceAnnualEarningByEducation20102023/DifferentEduLevelAE2005_20233',
    imageUrl: 'https://public.tableau.com/static/images/Da/DataSourceAnnualEarningByEducation20102023/DifferentEduLevelAE2005_20233/1.png'
  },
  {
    title: 'Annual Earnings Overview',
    id: 'viz1740189325124',
    name: 'AnnualEarningByEducationLevel20102023/AE_allL',
    imageUrl: 'https://public.tableau.com/static/images/An/AnnualEarningByEducationLevel20102023/AE_allL/1.png'
  }
];

let viz;
let currentViewIndex = 0;

function initTableau() {
  const container = document.getElementById('vizContainer');
  if (!container) return;

  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'btn-group d-flex flex-wrap justify-content-center mb-4';
  
  tableauViews.forEach((view, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `btn btn-outline-primary m-1 ${index === currentViewIndex ? 'active' : ''}`;
    button.textContent = view.title;
    button.onclick = () => loadView(index);
    buttonContainer.appendChild(button);
  });

  container.appendChild(buttonContainer);

  
  const vizContainer = document.createElement('div');
  vizContainer.id = 'tableauVizContainer';
  container.appendChild(vizContainer);

  
  loadView(currentViewIndex);
}

function loadView(index) {
  currentViewIndex = index;
  const view = tableauViews[index];
  const container = document.getElementById('tableauVizContainer');
  
  
  document.querySelectorAll('.btn-outline-primary').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  
  if (viz) viz.dispose();

  
  container.innerHTML = `
    <div class='tableauPlaceholder' id='${view.id}'>
      <object class='tableauViz' style='display:none;'>
        <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
        <param name='embed_code_version' value='3' />
        <param name='site_root' value='' />
        <param name='name' value='${view.name}' />
        <param name='tabs' value='no' />
        <param name='toolbar' value='yes' />
        <param name='animate_transition' value='yes' />
        <param name='display_static_image' value='yes' />
        <param name='display_spinner' value='yes' />
        <param name='display_overlay' value='yes' />
        <param name='display_count' value='yes' />
        <param name='language' value='en-US' />
      </object>
    </div>
  `;

  const divElement = document.getElementById(view.id);
  const vizElement = divElement.getElementsByTagName('object')[0];

  vizElement.style.width = '100%';
  vizElement.style.height = '800px'; 

  viz = new tableau.Viz(divElement, `https://public.tableau.com/views/${view.name}`, {
    hideTabs: false,
    width: '100%',
    height: '800px', 
    onFirstInteractive: function() {
      console.log('View loaded successfully');
    }
  });
}

document.addEventListener('DOMContentLoaded', initTableau);

window.addEventListener('resize', () => {
  const container = document.getElementById('tableauVizContainer');
  if (container) {
    const vizElement = container.getElementsByTagName('object')[0];
    if (vizElement) {
      vizElement.style.width = '100%';
      vizElement.style.height = (container.offsetWidth * 0.75) + 'px';
    }
  }
});


function setActiveNavLink() {
  
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  switch(currentPage) {
    case 'github.html':
      document.getElementById('nav-github')?.classList.add('active');
      break;
    case 'linkedin.html':
      document.getElementById('nav-linkedin')?.classList.add('active');
      break;
    case 'medium.html':
      document.getElementById('nav-medium')?.classList.add('active');
      break;
    case 'python.html':
      document.querySelector('a[href="python.html"]')?.classList.add('active');
      break;
    case 'games.html':
      document.querySelector('a[href="games.html"]')?.classList.add('active');
      break;
    case 'tableau.html':
      document.querySelector('a[href="tableau.html"]')?.classList.add('active');
      break;
    case 'index.html':
      document.querySelector('a[href="https://wincyysh.com/"]')?.classList.add('active');
      break;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setActiveNavLink();
  
  if (document.getElementById('tableauViz')) {
    fetchTableau();
  }

  if (document.getElementById('repos-container')) {
    fetchGitHubRepos();
  }

  if (document.getElementById('medium-posts')) {
    fetchMediumPosts();
  }

});

