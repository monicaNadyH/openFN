//
//  WatsonSpeech.swift
//
//
//

import Foundation
import UIKit
import TextToSpeechV1
import AVFoundation
import SpeechToTextV1
import AudioToolbox


@objc public class WatsonSpeech: NSObject {
    
    var player: AVAudioPlayer?
    
    var audioPlayer: AVAudioPlayer!
    
    var speechToText: SpeechToText? = nil
    
    
    
    func textToSpeechStart(text: String, username: String, password: String, url: String) {
        print("WatsonSpeech::textToSpeech "+text)
        
        let username = username
        let password = password
        let textToSpeech = TextToSpeech(username: username, password: password)
        
        textToSpeech.serviceURL = url
        
        let failure = { (error: Error) in print(error) }
        textToSpeech.synthesize(text, failure: failure) { data in
            self.audioPlayer = try! AVAudioPlayer(data: data)
            self.audioPlayer.play()
        }

    }
    
    func textToSpeechStop() {
        if let audioPlayer = self.audioPlayer {
            if audioPlayer.isPlaying {
                self.audioPlayer.stop()
            }
        }
    }
    
    func startRecording(username: String, password: String, url: String, sendText: @escaping (String?, String?) -> Void){
        
        AudioServicesPlaySystemSound (1113)
        print("WatsonSpeech::startRecording")
        
        var settings = RecognitionSettings(contentType: .opus)
        settings.continuous = true
        settings.interimResults = true
        settings.inactivityTimeout = 1
        
        let failure = { (error: Error) in
            
            print(error)
            let errCode: Int = (error as NSError).code
            let errStr: String = (error as NSError).domain

            print("Error code = \(errCode)");
            print("Error message = \(errStr)");
            
            switch errCode {
                case 0:
                    AudioServicesPlaySystemSound (1114)
                    sendText("","endOfSpeechDetected")
                    break
                case 2:
                    sendText("","networkError")
                    break
                default: //54 - Connection reset by peer NSPOSIXErrorDomain
                    sendText("","otherError")
                
            }
        }

        
        if  let stt = self.speechToText {
            print("speech to text is already initialized \(stt)")
        }else {
            print("new instance of speech to text")
            self.speechToText = SpeechToText(username: username, password: password)
            
        }
        
        self.speechToText?.recognizeMicrophone(settings: settings, failure: failure) { results in
            print(results.bestTranscript)
            
            var transcribedText = ""
            if results.results.count > 1 {
                for result in results.results {
                    if let transcript = result.alternatives.last?.transcript {
                        transcribedText += transcript
                    }
                }
                
            }else{
                //print(results.bestTranscript)
                transcribedText = results.bestTranscript
            }
            
            sendText(transcribedText,"")
        }

       
        
    }
    
    func stopRecording(){
        
        print("WatsonSpeech::stopRecording")
        
        if  let stt = self.speechToText {
            self.speechToText?.stopRecognizeMicrophone()
        }else {
            print("speech to text has not been initialized yet. Ignore stop microphone request.")
        }
        
    }
    
    
    /*func stopRecording(){
     
        print("WatsonSpeech::stopRecording")
        AudioServicesPlaySystemSound (1114)
        if let stopStreaming = self.stopStreaming {
            stopStreaming()
        }
        
    }*/
    
    
    /*func startRecording(sendText: (String?, String?) -> Void){
        AudioServicesPlaySystemSound (1113)
        print("WatsonSpeech::startRecording")
        // define transcription settings
        var settings = TranscriptionSettings(contentType: .L16(rate: 16000, channels: 1))
        
        settings.continuous = true
        settings.interimResults = true
        settings.inactivityTimeout = 1
        
        // start streaming audio and print transcripts
        let failure = { (error: NSError) in
                print("error occurred \(error)")
            
                switch error.code {
                    case 0:
                        sendText("","endOfSpeechDetected")
                        break
                    case 2:
                        sendText("","networkError")
                        break
                    default: //54 - Connection reset by peer NSPOSIXErrorDomain
                        sendText("","otherError")
                
                }
            
            }
        
        self.stopStreaming = speechToText.transcribe(settings, failure: failure) { results in
            print("results = \(results)")
            
            var transcribedText = ""
            if (results ?? []).count > 1 {
                for result in results {
                    if let transcript = result.alternatives.last?.transcript {
                        transcribedText += transcript
                    }
                }
                
            }else{
                print(results.last?.alternatives.last?.transcript)
                transcribedText = (results.last?.alternatives.last?.transcript)!
            }
            
            sendText(transcribedText,"");
            
        }
    }
    
    func stopRecording(){
        
        print("WatsonSpeech::stopRecording")
        AudioServicesPlaySystemSound (1114)
        if let stopStreaming = self.stopStreaming {
           stopStreaming()
        }

    }*/
    
    
}
