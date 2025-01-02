const {readEnv}=require('../lib/database');
const {cmd,commands}=require('../command');
const os=require("os");
const {runtime}=require('../lib/functions');
const moment=require('moment-timezone');
const sensitiveData=require('../dila_md_licence/a/b/c/d/dddamsbs');

cmd({pattern:"alive",
     desc:"Check uptime, RAM usage, and more",
     category:"main",
     react:"👺",
     filename:__filename
    },
    
    async(conn,mek,m,{from,quoted,body,isCmd,command,args,q,isGroup,sender,senderNumber,botNumber2,botNumber,pushname,isMe,isOwner,groupMetadata,groupName,participants,groupAdmins,isBotAdmins,isAdmins,reply})=>{
      try{
        
        const config=await readEnv();
        
        const totalRAM=Math.round(os.totalmem()/1024/1024);
        const usedRAM=(process.memoryUsage().heapUsed/1024/1024).toFixed(2);
        const freeRAM=(totalRAM-parseFloat(usedRAM)).toFixed(2);const date=moment().tz("Asia/Colombo").format("YYYY-MM-DD");
        const time=moment().tz("Asia/Colombo").format("HH:mm:ss");
        const hour=moment().tz("Asia/Colombo").format("HH");
        const minute=moment().tz("Asia/Colombo").format("mm");
        const greeting=hour>=0&&hour<12?'𝗚𝗢𝗢𝗗 𝗠𝗢𝗥𝗡𝗜𝗡𝗚':hour>=12&&hour<18?'𝗚𝗢𝗢𝗗 𝗔𝗙𝗧𝗘𝗥𝗡𝗢𝗢𝗡':'𝗚𝗢𝗢𝗗 𝗡𝗜𝗚𝗛𝗧';
        const roundedMinute=Math.round(minute/30)*30;const roundedTime=`${hour}:${roundedMinute<10?'0'+roundedMinute:roundedMinute}`;
        const timeEmojiMap={'00:00':'🕛','00:30':'🕧','01:00':'🕐','01:30':'🕜','02:00':'🕑','02:30':'🕝','03:00':'🕒','03:30':'🕞','04:00':'🕓','04:30':'🕟','05:00':'🕔','05:30':'🕠','06:00':'🕕','06:30':'🕡','07:00':'🕖','07:30':'🕢','08:00':'🕗','08:30':'🕣','09:00':'🕘','09:30':'🕤','10:00':'🕙','10:30':'🕥','11:00':'🕚','11:30':'🕦','12:00':'🕛','12:30':'🕧','13:00':'🕐','13:30':'🕜','14:00':'🕑','14:30':'🕝','15:00':'🕒','15:30':'🕞','16:00':'🕓','16:30':'🕟','17:00':'🕔','17:30':'🕠','18:00':'🕕','18:30':'🕡','19:00':'🕖','19:30':'🕢','20:00':'🕗','20:30':'🕣','21:00':'🕘','21:30':'🕤','22:00':'🕙','22:30':'🕥','23:00':'🕚','23:30':'🕦'};
        const currentTimeEmoji=timeEmojiMap[`${hour}:${roundedMinute<10?'0'+roundedMinute:roundedMinute}`]||'🫂';
        const dateEmoji=date.split('-').map(part=>part.replace(/0/g,'0️⃣').replace(/1/g,'1️⃣').replace(/2/g,'2️⃣').replace(/3/g,'3️⃣').replace(/4/g,'4️⃣').replace(/5/g,'5️⃣').replace(/6/g,'6️⃣').replace(/7/g,'7️⃣').replace(/8/g,'8️⃣').replace(/9/g,'9️⃣')).join('-');
        const timeEmoji=time.split(':').map(part=>part.replace(/0/g,'0️⃣').replace(/1/g,'1️⃣').replace(/2/g,'2️⃣').replace(/3/g,'3️⃣').replace(/4/g,'4️⃣').replace(/5/g,'5️⃣').replace(/6/g,'6️⃣').replace(/7/g,'7️⃣').replace(/8/g,'8️⃣').replace(/9/g,'9️⃣')).join(':');
      
        const caption=`𝗛𝗲𝘆 ${pushname}\n${greeting} ${currentTimeEmoji}\n\n${config.ALIVE_MSG}\n\n𝗗𝗔𝗧𝗘: \n${dateEmoji}\n𝗧𝗜𝗠𝗘: \n${timeEmoji}\n\n${sensitiveData.plugginssd}`;
        
        let sentMessage=await conn.sendMessage(from,{
          image:{url:config.ALIVE_IMG},
          caption:caption 
        },  {quoted:mek||null});
        
        await conn.sendMessage(from,{
          react:{text:"👺",
                 key:sentMessage.key}});
        
        let sentAudio=await conn.sendMessage(from,{
          audio:{url:sensitiveData.audiomp('')},
          mimetype:'audio/mpeg',
          ptt:true},
                    {quoted:mek});
        
        await conn.sendMessage(from,{
          react:{text:"👺",
                 key:sentAudio.key}});
        
        await conn.sendPresenceUpdate('recording',from);
      }catch(e){
        console.log(e);
        reply(`Error: ${e}`);
      }
    });
