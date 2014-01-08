import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
from tornado import websocket
import os
import json

from tornado.options import define, options
import getTemHum as gth


define("port", default=8080, help="run on the given port", type=int)
settings = {
    "static_path": os.path.join(os.path.dirname(__file__), "static"),
    "debug": "True",
}

num_wheelchair=4
    
class MainHandler(tornado.web.RequestHandler):  
    def get(self):
        self.render("index.html")

class MyWebSocket(websocket.WebSocketHandler):
    def open(self):
        #self.write_message("hi from the server")
        print "open websocket"

    def on_message(self, message):    
        print "websocket received a message:"+message
        #self.write_message("you said:"+ message)
        msg= message.split(',')
        prev_time=float(msg[1])
        wheelchair_num=int(msg[0])
        j=0
        replied=False
        #while j<100:
        while replied==False:
            pro1 = gth.ProcessScript()
            pro1.RunProcess(wheelchair_num,prev_time)
            #print len(pro1.TimeVector[0])
            #print len(pro1.unpkData.getTemp())
            #print len(pro1.TimeVector[1])
            #print len(pro1.unpkData.getHum())
            if ((len(pro1.TimeVector[0])>0 and len(pro1.TimeVector[1])>0) and (len(pro1.unpkData.getTemp())>0 and len(pro1.unpkData.getHum())>0 )):
               self.write_message(""+str(pro1.TimeVector[0][0])+","+str(pro1.unpkData.getTemp()[0])+","+str(pro1.unpkData.getHum()[0]))
               #prev_time=pro1.TimeVector[0][-1]+10.1
               replied=True
               print str(pro1.TimeVector[0][0])
            else:
               prev_time+=7.0
           
            #j+=1
            
        #pro1.TimeVector[0], pro1.unpkData.getTemp()
        #message_parsed= json.loads(message)              
        #username= message_parsed[len(message_parsed)-1]

        #self.write_message(json.dumps({"tree":new_tree,"treeRelation":new_treeRelation,"boxPosition":[]}))
        #index= message_parsed[0]
       
        #for i in range(len(pro1.TimeVector[0])):
           #self.write_message(json.dumps({pro1.TimeVector[0][i]:pro1.unpkData.getTemp()[i]}))
    def on_close(self):
        print "WebSocket closed"

        
class AllMyWebSocket(websocket.WebSocketHandler):
    def open(self):
        print "open websocket"

    def on_message(self, message):
        print "websocket received a message:"+message
        #self.write_message("you said:"+ message)       
        prev_time=float(message)+1
        replied=False
        while replied==False:
            reply={}
            j=1
            while j<=num_wheelchair:
               pro1 = gth.ProcessScript()
               pro1.RunProcess(j,prev_time)
               temp_data=pro1.unpkData.getTemp()
               hum_data=pro1.unpkData.getHum()
               if ((len(pro1.TimeVector[0])>0 and len(pro1.TimeVector[1])>0) and (len(temp_data)>0 and len(hum_data)>0 )):
                  new=str(pro1.TimeVector[0][0])+","+str(temp_data[0])+","+str(hum_data[0])
                  reply[j]=new
               j+=1
            print reply
            if len(reply.keys())>0:
                self.write_message(json.dumps(reply, sort_keys=True))
                replied=True
            else:
                prev_time+=8.0
    def on_close(self):
        print "WebSocket closed"
        
def main():
    tornado.options.parse_command_line()
    application = tornado.web.Application([
        (r"/", MainHandler),
        (r"/websocket", MyWebSocket),
        (r"/allwebsocket", AllMyWebSocket),

    ],**settings)
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
if __name__ == "__main__":
    import time, threading
    main()
