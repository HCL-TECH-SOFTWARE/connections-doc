
# Preparing CEC deployment configuration

Create a configuration file that fits the needs of your target CEC (WebEngine) deployment. The configuration file is the heart of your deployment using Helm. It defines how CEC (WebEngine) is deployed to supported platforms, and how it behaves during runtime operations. This section explains how to create your own configuration file and how to leverage the existing `values.yaml` inside the Helm Chart. It also explains how to optionally overwrite settings in case the default set may not be sufficient.

This documentation refers to custom configuration file as `custom-values.yaml`. You may name your custom configuration file as preferred.

Additional information on other custom configurations are discussed on the succeeding sections. 