# Ways to upgrade to Connections 8.0 {#c_3_ways_to_upgrade .concept}

You can upgrade to HCL Connections 8.0  by doing either a side-by-side or an in-place upgrade, or by taking an approach that is a hybrid of the two.

## First, the terminology {#section_kqd_jgb_sqb .section}

In a *side-by-side* upgrade, you start with a fresh install of Connections 8.0 in a new environment, and then do the needed migrations from the existing environment.

In both an *in-place* and a *hybrid* approach, you upgrade your 7.0 environment by using the Update function in the installation program. The difference between these approaches is that the in-place upgrade takes place in your production environment, while the hybrid upgrade is done in a new environment that you have set up to be identical to your 7.0 production environment.

The term *upgrading* is used as an umbrella term for getting to the newer Connections version, regardless of the approach, and *updating* is used for applying periodic fixes to that new version.

*Migrating* refers to moving user data, as well as configuration changes and other customizations, from the old to the new version, regardless of whether they are located on the same system or a new system.

## Understanding the approaches {#section_j2z_z5v_pqb .section}

Here are the key things to know about the upgrade approaches:

Side-by-side upgrades
:   Side by side is the approach most often used by HCL Digital Solutions services group and Technical Advisors group. With this approach, you gain the benefit of migrating configuration changes and other customizations \(and testing them\) before switching the new environment to production.

:   Migrating configuration changes and other customizations is entirely manual with this approach, so it requires careful record keeping and a thorough understanding of the processes involved in applying the changes to the new setup.

In-place upgrades
:   For smaller environments, the in-place upgrade is the easiest option with the lowest risk, as long as known, working backups/snapshots are available should you encounter an issue. Running the Installation Manager update function preserves some of the configuration and changes that you made in 8.0. These changes – file-related settings such as round-trip editing, quotas, proxy configuration, and so on – are stored in XML and other data formats and kept or extended during upgrade.

Hybrid upgrades
:   The hybrid upgrade uses the same process as the in-place, except that in a new environment identical to that in production. As with the side-by-side, you gain the benefit of migrating remaining customizations and testing them before switching it to production.

:   This "mirrored" type of set up was the approach used by the Connections team in their internal environment. For more information, see [Considerations for an in-place or hybrid upgrade](c_inplace_upgrade_considerations.md).

## Comparing the approaches {#section_ors_bvv_pqb .section}

The following table is provided to aid you in planning your upgrade.

| |Side-by-Side|In-Place|Hybrid|
|--|------------|--------|------|
|**Pros**|
|Dovetails with upgrading system requirements|X| |X|
|Allows sufficient testing before rollout|X| |X|
|Lessens downtime|X| |X|
|Preserves most configuration settings| |X|X|
|Fastest when upgrading from versions earlier than 6.5 CR1|X| | |
|**Cons**|
|Requires more hardware resources|X| |X|
|Increases risk of problems, rollback| |X| |
|Requires most knowledge/records of existing deployment configurations|X| | |

**Parent topic:**[Upgrading and updating](../migrate/c_upgrade_migrate_overview.md)

