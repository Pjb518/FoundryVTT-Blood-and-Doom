export default function renderSettings(_, [html]) {
  const systemTitle = html.querySelector('.settings-sidebar .system-title');
  systemTitle.innerText = 'Blood and Doom';

  const systemRow = html.querySelector('.settings-sidebar li.system');

  const systemLogoRow = systemRow?.cloneNode(false);
  systemLogoRow.classList.remove("system");

  const logoLink = document.createElement("a");
  logoLink.href = "https://dicetalegames.com/games/blood-and-doom/";
  logoLink.target = '_blank';
  logoLink.classList.add("bnd-community-link", "bnd-community-link--logo");

  const logoElement = document.createElement('img');
  logoElement.src = "/systems/blood-and-doom/assets/logos/grayscale-logo.webp";
  logoElement.classList.add("bnd-logo", "bnd-logo--sidebar");

  logoLink.append(logoElement);
  systemLogoRow.append(logoLink);

  const systemInfo = systemRow?.cloneNode(false);
  systemInfo.classList.remove('system');
  systemInfo.classList.add('bnd-community-links');

  const links = [
    {
      classes: ['bnd-community-link', 'bnd-community-link--discord'],
      icon: '<i class="fa-brands fa-discord"></i>',
      label: 'Discord',
      tooltip: 'Join the community Discord server',
      url: 'https://discord.gg/APTKATGeJW'
    },
    {
      classes: ['bnd-community-link', 'bnd-community-link--patreon'],
      icon: '<i class="fa-brands fa-patreon"></i>',
      label: 'Patreon',
      tooltip: 'Support the system',
      url: 'https://www.patreon.com/ForgemasterModules'
    }
  ].map(({
    classes, icon, label, tooltip, url
  }) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.innerHTML = `${icon} ${label}`;
    anchor.target = '_blank';
    anchor.setAttribute('data-tooltip', tooltip);
    anchor.classList.add(...classes);

    return anchor;
  });

  systemInfo.append(...links);
  systemRow?.after(systemInfo);
  systemRow?.after(systemLogoRow);
}
