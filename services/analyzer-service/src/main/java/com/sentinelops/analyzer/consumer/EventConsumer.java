package com.sentinelops.analyzer.consumer;

import com.sentinelops.analyzer.StreamController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class EventConsumer {

    private static final Logger log = LoggerFactory.getLogger(EventConsumer.class);
    private final StreamController streamController;

    public EventConsumer(StreamController streamController) {
        this.streamController = streamController;
    }

    // @KafkaListener(topics = "sentinel.events", groupId = "sentinel-analyzer-group")
    public void consumeEvent(String payload) {
        log.info("[BACKBONE] Evento interceptado y procesado desde Kafka: {}", payload);
        streamController.dispatchEvent(payload);
    }
}
