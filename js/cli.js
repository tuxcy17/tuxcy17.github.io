/* global $, localStorage, Shell */

const errors = {
  invalidDirectory: 'Error: not a valid directory',
  noWriteAccess: 'Error: you do not have write access to this directory',
  fileNotFound: 'Error: file not found in current directory',
  fileNotSpecified: 'Error: you did not specify a file'
}

const struct = {
  tuxcy: ['about', 'skills', 'label', 'location', 'education']
}

const commands = {}
let systemData = {}
const rootPath = 'users/tuxcy'

const getDirectory = () => localStorage.directory
const setDirectory = (dir) => { localStorage.directory = dir }

// turn on fullscreen
const registerFullscreenToggle = () => {
  $('.button.green').click(() => {
    $('.terminal-window').toggleClass('fullscreen')
  })
}

// create new directory in current directory
commands.mkdir = commands.Mkdir = () => errors.noWriteAccess

// create new directory in current directory
commands.touch = commands.Touch = () => errors.noWriteAccess

// remove file from current directory
commands.rm = commands.Rm = () => errors.noWriteAccess

// view contents of specified directory
commands.ls = commands.Ls = (directory) => {
  if (directory === '..' || directory === '~') {
    return systemData['tuxcy']['index']
  }
  return systemData[getDirectory()]['index']
}

// view list of possible commands
commands.help = commands.Help = () => systemData.help

// display current path
commands.path = commands.Path = () => {
  const dir = getDirectory()
  return dir === 'tuxcy' ? rootPath : `${rootPath}/${dir}`
}

// see command history
commands.history = commands.History = () => {
  let history = localStorage.history
  history = history ? Object.values(JSON.parse(history)) : []
  return `<p>${history.join('<br>')}</p>`
}

// move into specified directory
commands.cd = commands.Cd = (newDirectory) => {
  const currDir = getDirectory()
  const dirs = Object.keys(struct)
  const newDir = newDirectory ? newDirectory.trim() : ''

  if (dirs.includes(newDir) && currDir !== newDir) {
    setDirectory(newDir)
  } else if (newDir === '' || newDir === '~' || (newDir === '..' && dirs.includes(currDir))) {
    setDirectory('tuxcy')
  } else if (newDir !== '.') {
    return errors.invalidDirectory
  }
  return null
}

// display contents of specified file
commands.cat = commands.Cat = (filename) => {
  if (!filename) return errors.fileNotSpecified

  const dir = getDirectory()
  const fileKey = filename.split('.')[0]

  if (fileKey in systemData[dir] && struct[dir].includes(fileKey)) {
    return systemData[dir][fileKey]
  }

  return errors.fileNotFound
}

commands.screenfetch = commands.Screenfetch = (callback) => {
  const newDiv = document.createElement('div')
  const p1 = document.createElement('p');
  const txt = 'tes keefeijfzh izejfzuehrzirz uizedzuedzi d,zecnzinczet fzerzedze zedzed zedzedzed z zefzed zedzedz esrsergzqez';
  // p1.classList.add('line-1', 'anim-typewriter');
  newDiv.append(p1);


//   newDiv.className = 'ascii-art';
//   newDiv.innerHTML = `
//             7O<br/>
//    @     GGG<br/>
//   7R   CQGGQ<br/>
//  SGR  GGGGGQ<br/>
// 7GGR #GGGGGQ      3GGGGGGS    SGC<br/>
// RGGRRGGGGGGQ  7GGGGGGGGGGGG#(GGG(<br/>
// QGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG<br/>
// GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGQGGGO<br/>
// GGGGGGGGGGGGGGGGGGGGGGQRGGGGGGGGGGG<br/>
// GGGGGGGGGGGGGGGGGQRS///QGGGGGGGGGGR<br/>
// GGGGGGGGGGGGGGQS(///^3QGGGGGGGGGGQ(<br/>
// GGGGGGGGGGGQ3(//////SGGQS3GGGGGGGGQ<br/>
// RGGGGGGGQ(//^///////RS(//RGGGGGGGGGt<br/>
//    (((O /^^/^^^//^/////3RGGGGGGGGGGGC<br/>
//      C///^/^^/^//^^^//^RGGGGGGGGGGGG7<br/>
//     (7^//^/^^//((////^/QGGGGGGGGGGGQ(<br/>
//     7R^ ^(S73/^   S//^^QGGRGGGGGGGGC<br/>
//    O7     O3       (^/^GGQ3((QGGGGR<br/>
//    S  OR(SO     /@  ///RR733S3QQ/<br/>
//    #t  7S^O(       /^^/(////OO(<br/>
//     7QCS^//(^     C3///////(/S<br/>
//    O/^///////(OO33/////^/(7O#O<br/>
//    C^^^^^/^/^^^^/^^/^^^^//(@RRR<br/>
//     #(((/^^^^^^^^/^/^/^////RRBB@@C<br/>
//    S(^/^^^//^^//^^////////^@RB@RRR@<br/>
//   3^/^^/^//^^^^/^/^//^////(@RBBBB@BBO<br/>
//  7/^^//^^//^/((OOSOO#(^///7@BBB@@@@BBC<br/>
//    (3O3773SO//^/////^((///RBBB@B@@@BBR@t<br/>
//          7RB@RO/^///^^////@BBB@@@@@@@BB@C<br/>
//          BB@BBB#//^///////RB@B@@@@@@@B@BB#<br/>
//          RB@BR@R@/^////^/RBB@@@@@@@@@B@@@BR<br/>
//         ^B@@BB@@@Q///^//#B@@@@@@@@@@@@@@BBBO<br/>
//         /@@@BB@@@7OOCO#@@@@@@@@@@@@@@@@@@BBR#<br/>
//         7@@B@B@@BC    /RB@@@@@@@@@@@@B@@@BBBBB<br/>
// <br/>
// ------------------------------------------------<br/>
// Thank you for visiting https://asciiart.website/<br/>
// This ASCII pic can be found at<br/>
// https://asciiart.website/index.php?art=television/futurama  <br/>`

  function slowlyWrite(str) {
    var parts = str.split(' ');


    function type() {
      var part = parts.shift();
      if (!part) {
        callback()
      } else {
        p1.innerText += ' ' + part;
        type()
      }
    }
    type();
  }
  slowlyWrite(txt);
  return newDiv
}

// initialize cli
$(() => {
  registerFullscreenToggle()
  const cmd = document.getElementById('terminal');
  const terminal = new Shell(cmd, commands);
  const input = $(terminal.term).find('span.input')[0];
  const initialCommand = 'screenfetch';

  $.ajaxSetup({ cache: false })
  loadData(function() {
    console.log('end loading data');
  })

    $(input).text(initialCommand);
    $('.root').last().html(localStorage.directory)

    // terminal.runCommand(initialCommand, function () {
      // terminal.resetPrompt(terminal.term, input)
    // });
})
